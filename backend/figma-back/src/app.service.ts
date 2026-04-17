import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    if (process.env.SEED === 'true') {
      await this.seedFromFile();
    }
  }

  async createUser(data: Partial<User>) {
    const u = this.userRepo.create({
      userId: data.userId,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      roles: data.roles || [],
    });
    return this.userRepo.save(u);
  }

  async login(query: { username?: string; email?: string }) {
    const where = query.username ? { username: query.username } : { email: query.email };
    const user = await this.userRepo.findOneBy(where as any);
    if (!user) return { ok: false };
    return { ok: true, user };
  }

  async deleteUser(id: string) {
    const res = await this.userRepo.delete({ userId: id } as any);
    return { affected: res.affected };
  }

  async createProduct(data: Partial<Product>) {
    const p = this.productRepo.create({
      productId: data.productId,
      sku: data.sku,
      name: data.name,
      status: data.status,
      pricing: data.pricing,
      inventory: data.inventory,
    });
    return this.productRepo.save(p);
  }

  async getProduct(id: string) {
    return this.productRepo.findOneBy({ productId: id } as any);
  }

    async getAllProduct() { 
    return this.productRepo.find();
  }

  async deleteProduct(id: string) {
    const res = await this.productRepo.delete({ productId: id } as any);
    return { affected: res.affected };
  }

  private async seedFromFile() {
    try {
      const file = path.resolve(process.cwd(), 'data-seed.json');
      if (!fs.existsSync(file)) return;
      const raw = fs.readFileSync(file, 'utf8');
      const payload = JSON.parse(raw);

      // seed users
      if (payload.user) {
        const u = payload.user;
        await this.userRepo.save(
          this.userRepo.create({
            userId: u.userId,
            username: u.username,
            email: u.email,
            firstName: u.firstName,
            lastName: u.lastName,
            roles: u.roles || [],
          }),
        );
      }

      // seed products
      if (Array.isArray(payload.operatingContext?.products)) {
        for (const pr of payload.operatingContext.products) {
          await this.productRepo.save(
            this.productRepo.create({
              productId: pr.productId,
              sku: pr.sku,
              name: pr.name,
              status: pr.status,
              pricing: pr.pricing,
              inventory: pr.inventory,
            }),
          );
        }
      }

      // parametric / org/branch - store as JSON in product or skip (schema doesn't define parametric tables)
    } catch (err) {
      // swallow seed errors but log
      // eslint-disable-next-line no-console
      console.error('Seed error', err?.message ?? err);
    }
  }
}

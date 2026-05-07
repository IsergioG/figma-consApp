import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Customer } from './entities/customer.entity';
import { Organization } from './entities/organization.entity';
import { MoneyOperation } from './entities/money-operation.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
    @InjectRepository(MoneyOperation)
    private readonly moneyOperationRepo: Repository<MoneyOperation>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    await this.ensureMoneyOperationSequence();
    await this.seedDefaultOrganizationsAndCustomers();
    await this.seedMoneyOperations();
    await this.syncMoneyOperationSequence();
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

  async login(query: { username?: string; email?: string }): Promise<{ ok: boolean; user?: User; message?: string }> {
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

  async createCustomer(data: Partial<Customer>) {
    const organization = await this.organizationRepo.findOneBy({ companyId: data.companyId } as any);
    if (!organization) {
      throw new NotFoundException(`Organization with companyId ${data.companyId} does not exist`);
    }

    const c = this.customerRepo.create({
      customerId: data.customerId,
      customerCode: data.customerCode,
      companyId: data.companyId,
      organization,
      customerType: data.customerType,
      status: data.status || 'ACTIVE',
      displayName: data.displayName,
      source: data.source,
      contact: data.contact,
      addresses: data.addresses,
      personProfile: data.personProfile,
      businessProfile: data.businessProfile,
      documents: data.documents,
      billingProfile: data.billingProfile,
      classification: data.classification,
      preferences: data.preferences,
      consents: data.consents,
      notes: data.notes,
    });
    return this.customerRepo.save(c);
  }

  async getAllCustomers() {
    return this.customerRepo.find();
  }

  async getCustomer(id: string) {
    return this.customerRepo.findOneBy({ customerId: id } as any);
  }

  async createTransaction(data: Partial<MoneyOperation>) {
    const generatedBranchId = data.branchId ?? this.generateBranchId();
    const generatedBusinessDate = data.businessDate ?? this.getTodayDate();
    const generatedBranchFinancialDayId =
      data.branchFinancialDayId ?? this.generateBranchFinancialDayId(generatedBranchId, generatedBusinessDate);

    const tx = this.moneyOperationRepo.create({
      moneyOperationId: data.moneyOperationId,
      operationType: data.operationType,
      branchId: generatedBranchId,
      branchFinancialDayId: generatedBranchFinancialDayId,
      businessDate: generatedBusinessDate,
      medium: data.medium,
      amount: data.amount,
      currency: data.currency,
      reasonCode: data.reasonCode,
      description: data.description,
      operationStatus: data.operationStatus,
      accountingStatus: data.accountingStatus,
      approvalRequired: data.approvalRequired ?? false,
      approvalMode: data.approvalMode,
      sourceContainer: data.sourceContainer,
      destinationContainer: data.destinationContainer,
      references: data.references,
      evidenceAssetIds: data.evidenceAssetIds,
      requestedByUserId: data.requestedByUserId,
      approvedByUserId: data.approvedByUserId,
      createdAt: data.createdAt ?? new Date().toISOString(),
      approvedAt: data.approvedAt,
      executedAt: data.executedAt,
    });
    return this.moneyOperationRepo.save(tx);
  }

  async getAllTransactions() {
    const data = await this.moneyOperationRepo.find();
    const servedAt = new Date().toISOString();
    return {
      requestContext: {
        requestId: `req-money-operations-list-${Date.now()}`,
        correlationId: `corr-money-operations-list-${servedAt.slice(0, 10)}`,
        servedAt,
      },
      data,
      page: {
        limit: data.length,
        count: data.length,
        nextCursor: null,
      },
    };
  }

  async getTransaction(id: string) {
    return this.moneyOperationRepo.findOneBy({ moneyOperationId: id } as any);
  }

  private generateBranchId() {
    const nextId = Date.now() % 1000;
    return `br_${(10 + nextId).toString().padStart(3, '0')}`;
  }

  private generateBranchFinancialDayId(branchId: string, businessDate: string) {
    return `bfd_${businessDate.replace(/-/g, '_')}_${branchId}`;
  }

  private getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  async createOrganization(data: Partial<Organization>) {
    const org = this.organizationRepo.create({
      companyId: data.companyId,
      companyName: data.companyName,
      organizationType: data.organizationType,
      status: data.status || 'ACTIVE',
    });
    return this.organizationRepo.save(org);
  }

  async getAllOrganizations() {
    return this.organizationRepo.find();
  }

  async getOrganization(id: string) {
    return this.organizationRepo.findOneBy({ companyId: id } as any);
  }

  private async seedDefaultOrganizationsAndCustomers() {
    try {
      const file = path.resolve(process.cwd(), 'all_customers_Example.json');
      if (!fs.existsSync(file)) return;

      const existingCustomers = await this.customerRepo.count();
      if (existingCustomers > 0) return;

      const raw = fs.readFileSync(file, 'utf8');
      const payload = JSON.parse(raw);
      const customers = Array.isArray(payload?.data) ? payload.data : [];
      if (customers.length === 0) return;

      const organizationMap = new Map<string, Organization>();
      for (const row of customers) {
        const companyId = row.companyId;
        if (!companyId || organizationMap.has(companyId)) continue;
        const companyName = this.formatCompanyName(companyId);
        const organization = this.organizationRepo.create({
          companyId,
          companyName,
          organizationType: 'COMPANY',
          status: 'ACTIVE',
        });
        organizationMap.set(companyId, organization);
      }

      if (organizationMap.size > 0) {
        await this.organizationRepo.save(Array.from(organizationMap.values()));
      }

      const allOrgs = await this.organizationRepo.find();
      const orgById = new Map(allOrgs.map((o) => [o.companyId, o]));

      const mappedCustomers = customers.map((row: any) =>
        this.customerRepo.create({
          customerId: row.customerId,
          customerCode: row.customerCode,
          companyId: row.companyId,
          organization: orgById.get(row.companyId),
          customerType: row.customerType,
          status: row.status || 'ACTIVE',
          displayName: row.displayName,
          source: row.source,
          contact: row.contact,
          addresses: row.addresses,
          personProfile: row.personProfile || null,
          businessProfile: row.businessProfile || null,
          documents: row.documents || null,
          billingProfile: row.billingProfile || null,
          classification: row.classification || row.classificationSummary || null,
          preferences: row.preferences || null,
          consents: row.consents || null,
          notes: row.notes || null,
        }),
      );

      await this.customerRepo.save(mappedCustomers);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Default seed error', err?.message ?? err);
    }
  }

  private formatCompanyName(companyId: string) {
    return companyId
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  private async seedMoneyOperations() {
    try {
      const existingOperations = await this.moneyOperationRepo.count();
      if (existingOperations > 0) return;

      const file = path.resolve(process.cwd(), 'money-operations-seed.json');
      if (!fs.existsSync(file)) return;

      const raw = fs.readFileSync(file, 'utf8');
      const payload = JSON.parse(raw);
      const operations = Array.isArray(payload?.data) ? payload.data : [];
      if (operations.length === 0) return;

      const mappedOperations = operations.map((op: any) =>
        this.moneyOperationRepo.create({
          moneyOperationId: op.moneyOperationId,
          operationType: op.operationType,
          branchId: op.branchId,
          branchFinancialDayId: op.branchFinancialDayId,
          businessDate: op.businessDate,
          medium: op.medium,
          amount: op.amount,
          currency: op.currency,
          reasonCode: op.reasonCode,
          description: op.description,
          operationStatus: op.operationStatus,
          accountingStatus: op.accountingStatus,
          approvalRequired: op.approvalRequired ?? false,
          approvalMode: op.approvalMode,
          sourceContainer: op.sourceContainer,
          destinationContainer: op.destinationContainer,
          references: op.references,
          evidenceAssetIds: op.evidenceAssetIds,
          requestedByUserId: op.requestedByUserId,
          approvedByUserId: op.approvedByUserId,
          createdAt: op.createdAt,
          approvedAt: op.approvedAt,
          executedAt: op.executedAt,
        }),
      );

      await this.moneyOperationRepo.save(mappedOperations);
      await this.syncMoneyOperationSequence();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Money operation seed error', err?.message ?? err);
    }
  }

  private async ensureMoneyOperationSequence() {
    try {
      await this.moneyOperationRepo.query(
        "CREATE SEQUENCE IF NOT EXISTS money_operation_id_seq START WITH 9001;",
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Money operation sequence create error', err?.message ?? err);
    }
  }

  private async syncMoneyOperationSequence() {
    try {
      const result = await this.moneyOperationRepo.query(
        "SELECT MAX(CAST(substring(money_operation_id from 'mop_(\\d+)') AS integer)) AS maxid FROM money_operation",
      );
      const maxId = Number(result?.[0]?.maxid ?? 0);
      const nextValue = Math.max(9001, maxId + 1);
      await this.moneyOperationRepo.query(
        `SELECT setval('money_operation_id_seq', ${nextValue - 1}, false);`,
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Money operation sequence sync error', err?.message ?? err);
    }
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

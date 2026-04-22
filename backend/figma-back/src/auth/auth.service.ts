import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { signJwt } from './jwt.utils';
import { randomUUID } from 'crypto';

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async generateToken(dto: { username?: string; email?: string }): Promise<TokenResponse | { ok: false }> {
    const where = dto.username ? { username: dto.username } : { email: dto.email };
    const user = await this.userRepo.findOneBy(where as any);
    if (!user) return { ok: false } as any;

    const now = Math.floor(Date.now() / 1000);
    const expiresInSec = 3600; // 1 hour
    const refreshExpiresInSec = 7 * 24 * 3600; // 7 days

    const accessToken = signJwt({ userId: user.userId, username: user.username, roles: user.roles || [] }, { expiresIn: `${expiresInSec}s` });
    const refreshToken = signJwt({ userId: user.userId, type: 'refresh' }, { expiresIn: `${refreshExpiresInSec}s` });

    const scope = Array.isArray(user.roles) ? user.roles.join(' ') : '';

    const resp: TokenResponse = {
      access_token: accessToken,
      expires_in: expiresInSec,
      refresh_expires_in: refreshExpiresInSec,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      'not-before-policy': now,
      session_state: randomUUID(),
      scope,
    };

    return resp;
  }
}

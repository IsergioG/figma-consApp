import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Organization } from './entities/organization.entity';
import { Branch } from './entities/branch.entity';
import { Product } from './entities/product.entity';
import { BranchAssignment } from './entities/branch-assignment.entity';
import { BusinessDay } from './entities/business-day.entity';
import { CashDrawer } from './entities/cash-drawer.entity';
import { FundingAccount } from './entities/funding-account.entity';
import { LedgerContext } from './entities/ledger-context.entity';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'figma_back_db',
      entities: [
        User,
        Organization,
        Branch,
        Product,
        BranchAssignment,
        BusinessDay,
        CashDrawer,
        FundingAccount,
        LedgerContext,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Organization,
      Branch,
      Product,
    ]),
    // Authentication module
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard, AuthService],
})
export class AppModule {}

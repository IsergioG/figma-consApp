import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { Branch } from '../entities/branch.entity';
import { Product } from '../entities/product.entity';
import { BranchAssignment } from '../entities/branch-assignment.entity';
import { BusinessDay } from '../entities/business-day.entity';
import { CashDrawer } from '../entities/cash-drawer.entity';
import { FundingAccount } from '../entities/funding-account.entity';
import { LedgerContext } from '../entities/ledger-context.entity';
import { Customer } from '../entities/customer.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'figma_back_db',
  synchronize: true,
  logging: false,
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
    Customer,
  ],
});

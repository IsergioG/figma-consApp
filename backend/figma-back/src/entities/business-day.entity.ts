import { Entity, PrimaryColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { Branch } from './branch.entity';
import { CashDrawer } from './cash-drawer.entity';
import { FundingAccount } from './funding-account.entity';
import { LedgerContext } from './ledger-context.entity';

@Entity()
export class BusinessDay {
  @PrimaryColumn()
  businessDayId: string;

  @ManyToOne(() => Branch, (b) => b.businessDays, { onDelete: 'CASCADE' })
  branch: Branch;

  @OneToMany(() => CashDrawer, (cd) => cd.businessDay)
  cashDrawers: CashDrawer[];

  @ManyToOne(() => FundingAccount, { nullable: true, onDelete: 'SET NULL' })
  fundingAccount: FundingAccount;

  @Column({ type: 'json', nullable: true })
  ledgerContext: LedgerContext | any;
}

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class FundingAccount {
  @PrimaryColumn()
  fundingAccountId: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  currency: string;
}

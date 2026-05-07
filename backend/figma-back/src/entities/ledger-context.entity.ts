import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LedgerContext {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  operatingAccountId: string;

  @Column({ nullable: true })
  branchToCompanyClearingAccountId: string;
}

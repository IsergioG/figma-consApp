import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MoneyOperation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: () => "'mop_' || nextval('money_operation_id_seq')" })
  moneyOperationId: string;

  @Column()
  operationType: string;

  @Column()
  branchId: string;

  @Column()
  branchFinancialDayId: string;

  @Column()
  businessDate: string;

  @Column()
  medium: string;

  @Column('numeric')
  amount: number;

  @Column()
  currency: string;

  @Column()
  reasonCode: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  operationStatus: string;

  @Column({ nullable: true })
  accountingStatus: string;

  @Column({ default: false })
  approvalRequired: boolean;

  @Column({ nullable: true })
  approvalMode: string;

  @Column({ type: 'json', nullable: true })
  sourceContainer: any;

  @Column({ type: 'json', nullable: true })
  destinationContainer: any;

  @Column({ type: 'json', nullable: true })
  references: any;

  @Column({ type: 'json', nullable: true })
  evidenceAssetIds: any;

  @Column({ nullable: true })
  requestedByUserId: string;

  @Column({ nullable: true })
  approvedByUserId: string;

  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  approvedAt: string;

  @Column({ nullable: true })
  executedAt: string;
}

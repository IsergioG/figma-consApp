import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './organization.entity';

@Entity()
export class Customer {
  @PrimaryColumn()
  customerId: string;

  @Column({ unique: true })
  customerCode: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Organization, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'companyId', referencedColumnName: 'companyId' })
  organization: Organization;

  @Column()
  customerType: string;

  @Column({ nullable: true, default: 'ACTIVE' })
  status: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  source: string;

  @Column({ type: 'json', nullable: true })
  contact: any;

  @Column({ type: 'json', nullable: true })
  addresses: any;

  @Column({ type: 'json', nullable: true })
  personProfile: any;

  @Column({ type: 'json', nullable: true })
  businessProfile: any;

  @Column({ type: 'json', nullable: true })
  documents: any;

  @Column({ type: 'json', nullable: true })
  billingProfile: any;

  @Column({ type: 'json', nullable: true })
  classification: any;

  @Column({ type: 'json', nullable: true })
  preferences: any;

  @Column({ type: 'json', nullable: true })
  consents: any;

  @Column({ type: 'json', nullable: true })
  notes: any;
}

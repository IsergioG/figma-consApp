import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './organization.entity';
import { Product } from './product.entity';
import { BusinessDay } from './business-day.entity';

@Entity()
export class Branch {
  @PrimaryColumn()
  branchId: string;

  @Column()
  branchName: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'json', nullable: true })
  address: any;

  @Column({ type: 'json', nullable: true })
  contactInfo: any;

  @Column({ type: 'json', nullable: true })
  billingProfile: any;

  @ManyToOne(() => Organization, (o) => o.branches, { onDelete: 'CASCADE' })
  organization: Organization;

  @OneToMany(() => Product, (p) => p.branch)
  products: Product[];

  @OneToMany(() => BusinessDay, (bd) => bd.branch)
  businessDays: BusinessDay[];
}

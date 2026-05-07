import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Branch } from './branch.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  productId: string;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'json', nullable: true })
  pricing: any;

  @Column({ type: 'json', nullable: true })
  inventory: any;

  @ManyToOne(() => Branch, (b) => b.products, { nullable: true, onDelete: 'SET NULL' })
  branch: Branch;
}

import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Branch } from './branch.entity';

@Entity()
export class Organization {
  @PrimaryColumn()
  companyId: string;

  @Column()
  companyName: string;

  @Column({ nullable: true })
  organizationType: string;

  @Column({ nullable: true })
  status: string;

  @OneToMany(() => Branch, (b) => b.organization)
  branches: Branch[];
}

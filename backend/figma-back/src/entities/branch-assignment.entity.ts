import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Branch } from './branch.entity';

@Entity()
export class BranchAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.branchAssignments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Branch, { onDelete: 'CASCADE' })
  branch: Branch;

  @Column('simple-array', { nullable: true })
  roles: string[];
}

import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { BranchAssignment } from './branch-assignment.entity';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column('simple-array', { nullable: true })
  roles: string[];

  @OneToMany(() => BranchAssignment, (ba) => ba.user)
  branchAssignments: BranchAssignment[];
}

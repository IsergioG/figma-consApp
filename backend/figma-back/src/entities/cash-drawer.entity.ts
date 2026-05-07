import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { BusinessDay } from './business-day.entity';

@Entity()
export class CashDrawer {
  @PrimaryColumn()
  cashDrawerId: string;

  @Column({ nullable: true })
  sessionId: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => BusinessDay, (bd) => bd.cashDrawers, { onDelete: 'CASCADE' })
  businessDay: BusinessDay;
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import {
  Channel,
  ReminderPriority,
  SendMode,
} from '../../../../reminder-options.enum';

@Entity({ name: 'reminder_options' })
export class ReminderOptionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isEnabled: boolean;

  @Column({
    type: 'enum',
    enum: SendMode,
    default: SendMode.FIXED_TIME,
  })
  sendMode: SendMode;

  @Column({
    type: 'time without time zone',
    nullable: true,
  })
  startTime?: string;

  @Column({
    type: 'time without time zone',
    nullable: true,
  })
  endTime?: string;

  @Column({
    type: 'enum',
    enum: ReminderPriority,
    default: ReminderPriority.MEDIUM,
  })
  priority: ReminderPriority;

  @Column({
    type: 'text',
    array: true,
    default: () => "ARRAY['email']::text[]",
  })
  channels: Channel[];

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid', unique: true })
  userId: string;
}

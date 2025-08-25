import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationPriority } from '../../constants/notifier.constants';

@Entity('notifications')
export class NotificationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  payload: Record<string, any> | null;

  @Column({
    type: 'enum',
    enum: NotificationPriority,
    default: NotificationPriority.NORMAL,
  })
  priority: NotificationPriority;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

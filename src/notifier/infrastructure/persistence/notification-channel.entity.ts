import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationChannelStatus } from '../../constants/notifier.constants';

@Entity('notification_channels')
export class NotificationChannelOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notificationId: string;

  @Column()
  channel: string;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date | null;

  @Column({
    type: 'enum',
    enum: NotificationChannelStatus,
    default: NotificationChannelStatus.PENDING,
  })
  status: NotificationChannelStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

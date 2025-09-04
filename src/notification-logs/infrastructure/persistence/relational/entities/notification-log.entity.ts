import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NotificationEntity } from '../../../../../notifications/infrastructure/persistence/relational/entities/notifications.entity';
import { NotificationChannelStatus } from '../../../../notification-logs.enum';
import { Channel } from '../../../../../reminder-options/reminder-options.enum';

@Entity('notification_logs')
export class NotificationLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: NotificationChannelStatus,
    default: NotificationChannelStatus.SENT,
  })
  status: NotificationChannelStatus;

  @Column({
    type: 'enum',
    enum: Channel,
    default: Channel.EMAIL,
  })
  channel: Channel;

  @Column({ type: 'text', nullable: true })
  errorMessage: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => NotificationEntity, { eager: true })
  @JoinColumn({ name: 'notificationId' })
  notification: NotificationEntity;

  @Column()
  notificationId: string;
}

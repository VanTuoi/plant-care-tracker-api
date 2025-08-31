import { NotificationChannelEntity } from '../entities/notification-channel.entity';

export interface NotificationChannelRepository {
  createChannelEntry(
    notificationId: string,
    channel: string,
  ): Promise<NotificationChannelEntity>;
  markAsSent(notificationId: string, channel: string): Promise<void>;
  markAsFailed(notificationId: string, channel: string): Promise<void>;
  markAsRead(notificationId: string, channel: string): Promise<void>;
}

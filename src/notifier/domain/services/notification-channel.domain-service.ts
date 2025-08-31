import { NotificationChannel } from '../../constants/notifier.constants';

export interface INotificationChannelService<T = any> {
  channel: NotificationChannel;
  send(dto: T, options?: any): Promise<void>;
}

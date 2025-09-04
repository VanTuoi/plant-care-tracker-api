import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { NotificationLog } from '../../domain/notification-log';

export abstract class NotificationLogRepository {
  abstract create(
    data: Omit<NotificationLog, 'id' | 'createdAt'>,
  ): Promise<NotificationLog>;

  abstract findAll(): Promise<NotificationLog[]>;

  abstract findById(
    id: NotificationLog['id'],
  ): Promise<NullableType<NotificationLog>>;

  abstract findByNotificationIds(
    notificationIds: string[],
  ): Promise<NotificationLog[]>;

  abstract update(
    id: NotificationLog['id'],
    payload: DeepPartial<NotificationLog>,
  ): Promise<NotificationLog | null>;
}

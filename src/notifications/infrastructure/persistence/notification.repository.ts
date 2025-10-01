import { DeepPartial } from 'typeorm';
import { NullableType } from '../../../utils/types/nullable.type';
import { Notification } from '../../domain/notification';

export abstract class NotificationRepository {
  abstract create(
    data: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Notification>;

  abstract findAll(): Promise<Notification[]>;

  abstract findById(
    id: Notification['id'],
  ): Promise<NullableType<Notification>>;
  abstract findByIds(ids: Notification['id'][]): Promise<Notification[]>;

  abstract update(
    id: Notification['id'],
    payload: DeepPartial<Notification>,
  ): Promise<Notification | null>;

  abstract findByUserId(userId: string): Promise<Notification[]>;
}

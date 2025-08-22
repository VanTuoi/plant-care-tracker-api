import { Notification } from "../entities/notification.entity";

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  findByUser(userId: string): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
}

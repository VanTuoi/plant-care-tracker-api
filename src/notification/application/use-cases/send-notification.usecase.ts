import { Injectable, Inject } from '@nestjs/common';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationRepository } from '../../domain/repositories/notification.repository';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    @Inject('NotificationRepository') 
    private readonly repo: NotificationRepository,
  ) {}

  async execute(userId: string, message: string, type: string) {
    const notification = new Notification(
      crypto.randomUUID(),
      userId,
      message,
      type as "user" | "system" | "marketing",
      new Date(),
      null,
    );

    await this.repo.save(notification);
    return notification;
  }
}

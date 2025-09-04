import { Injectable, Logger } from '@nestjs/common';
import { ReminderOptionRepository } from '../reminder-options/infrastructure/persistence/reminder-option.repository';
import { PlantRepository } from '../plants/infrastructure/persistence/plants.repository';
import { UserRepository } from '../users/infrastructure/persistence/user.repository';
import { NotificationLogsService } from '../notification-logs/notification-logs.service';

import { Channel } from '../reminder-options/reminder-options.enum';
import { NotificationChannelStatus } from '../notification-logs/notification-logs.enum';
import { NotificationTypeEnum } from '../notifications/notification.enum';
import { NotificationsService } from '../notifications/notifications.service';
import { WebsocketGateway } from '../websockets/websockets.gateway';
import { MailService } from '../mail/mail.service';
import { Plant } from '../plants/domain/plant';
import { Notification } from '../notifications/domain/notification';

@Injectable()
export class NotificationDispatcherService {
  private readonly logger = new Logger(NotificationDispatcherService.name);

  constructor(
    private readonly reminderOptionRepo: ReminderOptionRepository,
    private readonly plantRepo: PlantRepository,
    private readonly userRepo: UserRepository,
    private readonly notificationLogsService: NotificationLogsService,
    private readonly notificationsService: NotificationsService,
    private readonly mailService: MailService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async dispatchNotifications(): Promise<void> {
    const reminderOptions = await this.reminderOptionRepo.findAllActive();

    for (const option of reminderOptions) {
      const plants = await this.plantRepo.findByUserId(option.userId);
      const user = await this.userRepo.findById(option.userId);

      if (!user) continue;

      const plantsToNotify: { plant: Plant; notification: Notification }[] = [];

      for (const plant of plants) {
        if (!this.shouldNotify()) continue;

        const notification = await this.notificationsService.createInternal({
          userId: user.id,
          plantId: plant.id,
          isRead: false,
          url: '',
          title: `Nhắc nhở chăm sóc cây ${plant.name}`,
          type: NotificationTypeEnum.REMINDER,
          payload: JSON.stringify({
            reminderOptionId: option.id,
            plantName: plant.name,
          }),
        });

        plantsToNotify.push({ plant, notification });
      }

      if (plantsToNotify.length === 0) continue;

      for (const channel of option.channels) {
        try {
          switch (channel) {
            case Channel.EMAIL:
              if (user.email) {
                this.logger.debug(`📧 Gửi 1 email tổng hợp tới ${user.email}`);
                await this.mailService.sendPlantReminder({
                  to: user.email,
                  data: {
                    plantName: plantsToNotify
                      .map((p) => p.plant.name)
                      .join(', '),
                    schedule: 'Mỗi 3 ngày/lúc 8h sáng',
                  },
                });
              }
              break;

            case Channel.SOCKET:
              this.logger.debug(`📡 Gửi 1 socket tới ${user.id}`);
              this.websocketGateway.sendToUser(user.id, {
                type: 'notification',
                plants: plantsToNotify.map((p) => ({
                  id: p.plant.id,
                  name: p.plant.name,
                })),
                message: `Bạn có ${plantsToNotify.length} cây cần chăm sóc`,
              });
              break;
          }

          for (const { notification } of plantsToNotify) {
            await this.notificationLogsService.create({
              channel,
              status: NotificationChannelStatus.SENT,
              notificationId: notification.id,
            });
          }
        } catch (err) {
          for (const { notification } of plantsToNotify) {
            await this.notificationLogsService.create({
              channel,
              status: NotificationChannelStatus.FAILED,
              notificationId: notification.id,
              errorMessage: (err as Error).message,
            });
          }
        }
      }
    }
  }

  private shouldNotify(): boolean {
    // logic check
    return true;
  }
}

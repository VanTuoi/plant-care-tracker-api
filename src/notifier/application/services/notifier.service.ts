import { Inject, Injectable, Logger } from '@nestjs/common';
import { NotificationChannel } from '../../constants/notifier.constants';
import { NotificationMapper } from '../../mapping/notification.mapper';
import { CreateNotificationDto } from '../../dto/create-notification.dto';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationTypeOrmRepository } from '../../infrastructure/persistence/notification.repository.impl';
import { NotificationChannelTypeOrmRepository } from '../../infrastructure/persistence/notification-channel.repository.impl';
import { INotificationChannelService } from '../../domain/services/notification-channel.domain-service';
import { MailNotificationDto } from '../../dto/create-mail-notification.dto';

@Injectable()
export class NotifierService {
  private readonly logger = new Logger(NotifierService.name);

  constructor(
    private readonly notificationRepo: NotificationTypeOrmRepository,
    private readonly channelRepo: NotificationChannelTypeOrmRepository,
    @Inject('NOTIFICATION_CHANNELS')
    private readonly channels: INotificationChannelService[],
  ) {}

  async notifyUserByEmail(dto: MailNotificationDto) {
    const notification = NotificationMapper.fromMailDto(dto);
    await this.notificationRepo.save(notification);

    await this.handleChannel(notification, dto, NotificationChannel.MAIL);
  }

  async notifyUserBySocket(dto: CreateNotificationDto) {
    const notification = NotificationMapper.fromCreateDto(dto);
    await this.notificationRepo.save(notification);

    await this.handleChannel(notification, dto, NotificationChannel.WS);
  }

  private async handleChannel(
    notification: Notification,
    dto: CreateNotificationDto | MailNotificationDto,
    channelType: NotificationChannel,
  ) {
    await this.channelRepo.createChannelEntry(notification.id, channelType);

    const channelService = this.channels.find((c) => c.channel === channelType);
    if (!channelService) {
      this.logger.warn(`Channel ${channelType} not supported`);
      return;
    }

    try {
      await channelService.send(dto);
      await this.channelRepo.markAsSent(notification.id, channelType);
    } catch (err) {
      await this.channelRepo.markAsFailed(notification.id, channelType);
      this.logger.error(`Failed to send via ${channelType}`, err.stack);
    }
  }
}

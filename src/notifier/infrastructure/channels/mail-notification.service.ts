import { Injectable } from '@nestjs/common';
import { NotificationChannel } from '../../constants/notifier.constants';
import { MailerService } from '../../mailer/mailer.service';
import { INotificationChannelService } from '../../domain/services/notification-channel.domain-service';
import { MailNotificationDto } from '../../dto/create-mail-notification.dto';

@Injectable()
export class MailNotificationService implements INotificationChannelService {
  readonly channel = NotificationChannel.MAIL;

  constructor(private readonly mailer: MailerService) {}

  async send(notification: MailNotificationDto): Promise<void> {
    await this.mailer.sendMail(notification);
  }
}

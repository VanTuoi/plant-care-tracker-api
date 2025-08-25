import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from './mailer/mailer.module';
import { WsModule } from './ws/ws.module';
import { NotifierService } from './application/services/notifier.service';
import { NotificationTypeOrmRepository } from './infrastructure/persistence/notification.repository.impl';
import { NotificationChannelTypeOrmRepository } from './infrastructure/persistence/notification-channel.repository.impl';
import { NotificationOrmEntity } from './infrastructure/persistence/notification.entity';
import { NotificationChannelOrmEntity } from './infrastructure/persistence/notification-channel.entity';
import { MailNotificationService } from './infrastructure/channels/mail-notification.service';
import { WsNotificationChannelService } from './infrastructure/channels/ws-notification.service';

@Module({
  imports: [
    MailerModule,
    WsModule,
    TypeOrmModule.forFeature([
      NotificationOrmEntity,
      NotificationChannelOrmEntity,
    ]),
  ],
  providers: [
    NotifierService,
    NotificationTypeOrmRepository,
    NotificationChannelTypeOrmRepository,
    MailNotificationService,
    WsNotificationChannelService,
    {
      provide: 'NOTIFICATION_CHANNELS',
      useFactory: (
        mail: MailNotificationService,
        ws: WsNotificationChannelService,
      ) => [mail, ws],
      inject: [MailNotificationService, WsNotificationChannelService],
    },
  ],
  exports: [NotifierService],
})
export class NotifierModule {}

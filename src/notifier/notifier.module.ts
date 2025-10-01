import { Module } from '@nestjs/common';
import { WsModule } from '../websockets/ws.module';
import { NotificationDispatcherService } from './notifier.service';
import { ReminderOptionsModule } from '../reminder-options/reminder-options.module';
import { PlantsModule } from '../plants/plants.module';
import { UsersModule } from '../users/users.module';
import { NotificationLogsModule } from '../notification-logs/notification-logs.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { RedisPubSubService } from '../websockets/redis-pubsub.service';
import { MailModule } from '../mail/mail.module';
import { NotificationDispatcherController } from './notifier.controller';
import { WatersModule } from '../waters/waters.module';
import { FertilizersModule } from '../fertilizers/fertilizers.module';

const controllers =
  process.env.NODE_ENV === 'development'
    ? [NotificationDispatcherController]
    : [];

@Module({
  imports: [
    MailModule,
    WsModule,
    ReminderOptionsModule,
    PlantsModule,
    WatersModule,
    FertilizersModule,
    UsersModule,
    NotificationLogsModule,
    NotificationsModule,
  ],
  providers: [NotificationDispatcherService, RedisPubSubService],
  controllers,
  exports: [NotificationDispatcherService],
})
export class NotifierModule {}

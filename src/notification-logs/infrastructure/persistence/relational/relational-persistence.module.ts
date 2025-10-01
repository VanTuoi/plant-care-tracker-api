import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationLogEntity } from './entities/notification-log.entity';
import { NotificationLogRepository } from '../notification-logs.repository';
import { NotificationLogsRelationalRepository } from './repositories/notification-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationLogEntity])],
  providers: [
    {
      provide: NotificationLogRepository,
      useClass: NotificationLogsRelationalRepository,
    },
  ],
  exports: [NotificationLogRepository],
})
export class RelationalNotificationLogPersistenceModule {}

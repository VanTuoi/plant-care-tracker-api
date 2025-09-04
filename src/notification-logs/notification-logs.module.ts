import { Module } from '@nestjs/common';
import { NotificationLogsService } from './notification-logs.service';
import { RelationalNotificationLogPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RelationalNotificationPersistenceModule } from '../notifications/infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule =
  RelationalNotificationLogPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    RelationalNotificationPersistenceModule,
  ],
  providers: [NotificationLogsService],
  exports: [NotificationLogsService, infrastructurePersistenceModule],
})
export class NotificationLogsModule {}

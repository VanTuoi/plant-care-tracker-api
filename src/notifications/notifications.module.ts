import { Module } from '@nestjs/common';
import { RelationalNotificationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { UsersModule } from '../users/users.module';

const infrastructurePersistenceModule = RelationalNotificationPersistenceModule;

@Module({
  imports: [UsersModule, infrastructurePersistenceModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [infrastructurePersistenceModule, NotificationsService],
})
export class NotificationsModule {}

import { Module } from '@nestjs/common';
import { NotificationGateway } from './infrastructure/websocket/notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './application/services/notification.service';
import { SendNotificationUseCase } from './application/use-cases/send-notification.usecase';
import { NotificationOrmEntity } from './infrastructure/persistence/notification.entity';
import { NotificationTypeOrmRepository } from './infrastructure/persistence/notification.typeorm-repository';
import { NotificationController } from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationOrmEntity])],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    SendNotificationUseCase,
    NotificationGateway,
    { provide: 'NotificationRepository', useClass: NotificationTypeOrmRepository },
  ],
  exports: [NotificationService, SendNotificationUseCase],
})
export class NotificationModule {}

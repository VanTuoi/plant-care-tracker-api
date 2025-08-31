import { Injectable } from '@nestjs/common';
import { NotificationChannel } from '../../constants/notifier.constants';
import { WebsocketGateway } from '../../ws/websockets.gateway';
import { NotificationChannelTypeOrmRepository } from '../persistence/notification-channel.repository.impl';
import { CreateNotificationDto } from '../../dto/create-notification.dto';
import { INotificationChannelService } from '../../domain/services/notification-channel.domain-service';

@Injectable()
export class WsNotificationChannelService
  implements INotificationChannelService
{
  channel = NotificationChannel.WS;

  constructor(
    private readonly websocket: WebsocketGateway,
    private readonly channelRepo: NotificationChannelTypeOrmRepository,
  ) {}

  async send(dto: CreateNotificationDto) {
    if (!dto.userId) throw new Error('WS channel requires userId');
    try {
      this.websocket.sendToUser(dto.userId, dto.payload);
      await this.channelRepo.markAsSent(dto.userId!, this.channel);
    } catch {
      await this.channelRepo.markAsFailed(dto.userId!, this.channel);
      throw new Error('WS send failed');
    }
  }
}

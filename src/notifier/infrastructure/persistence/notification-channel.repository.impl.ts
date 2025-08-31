import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationChannelOrmEntity } from './notification-channel.entity';
import { NotificationChannelRepository } from '../../domain/repositories/notification-channel.repository';
import { NotificationChannelEntity } from '../../domain/entities/notification-channel.entity';
import { NotificationChannelStatus } from '../../constants/notifier.constants';

@Injectable()
export class NotificationChannelTypeOrmRepository
  implements NotificationChannelRepository
{
  constructor(
    @InjectRepository(NotificationChannelOrmEntity)
    private readonly repo: Repository<NotificationChannelOrmEntity>,
  ) {}

  async createChannelEntry(
    notificationId: string,
    channel: string,
  ): Promise<NotificationChannelEntity> {
    const entry = this.repo.create({
      notificationId,
      channel,
      status: NotificationChannelStatus.PENDING,
    });
    const saved = await this.repo.save(entry);

    return new NotificationChannelEntity(
      saved.id,
      saved.notificationId,
      saved.channel,
      saved.status,
      saved.deliveredAt,
      saved.readAt,
    );
  }

  async markAsSent(notificationId: string, channel: string): Promise<void> {
    await this.repo.update(
      { notificationId, channel },
      { status: NotificationChannelStatus.SENT, deliveredAt: new Date() },
    );
  }

  async markAsFailed(notificationId: string, channel: string): Promise<void> {
    await this.repo.update(
      { notificationId, channel },
      { status: NotificationChannelStatus.FAILED },
    );
  }

  async markAsRead(notificationId: string, channel: string): Promise<void> {
    await this.repo.update(
      { notificationId, channel },
      { status: NotificationChannelStatus.READ, readAt: new Date() },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { NotificationOrmEntity } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationPriority } from '../../constants/notifier.constants';

@Injectable()
export class NotificationTypeOrmRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly repo: Repository<NotificationOrmEntity>,
  ) {}

  async save(notification: Notification): Promise<void> {
    const ormEntity = this.repo.create({
      id: notification.id,
      userId: notification.userId,
      email: notification.email,
      title: notification.title,
      message: notification.message,
      payload: notification.payload ?? undefined,
      priority: notification.priority ?? NotificationPriority.NORMAL,
      createdAt: notification.createdAt,
    });
    await this.repo.save(ormEntity);
  }

  async findByUser(userId: string): Promise<Notification[]> {
    const ormEntities = await this.repo.find({ where: { userId } });

    return ormEntities.map(
      (ormEntity) =>
        new Notification(
          ormEntity.id,
          ormEntity.userId,
          ormEntity.email,
          ormEntity.title,
          ormEntity.message,
          ormEntity.payload,
          ormEntity.priority as NotificationPriority,
          ormEntity.createdAt,
        ),
    );
  }

  async markAsRead(id: string): Promise<void> {
    await Promise.resolve();
    console.log('read id', id);
  }
}

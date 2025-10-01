import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { NotificationEntity } from '../entities/notifications.entity';
import { Notification } from '../../../../domain/notification';
import { NotificationMapper } from '../mappers/notification.mapper';
import { NotificationRepository } from '../../notification.repository';
import { NullableType } from '../../../../../utils/types/nullable.type';

@Injectable()
export class NotificationsRelationalRepository
  implements NotificationRepository
{
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepository: Repository<NotificationEntity>,
  ) {}

  async create(data: Notification): Promise<Notification> {
    const persistenceModel = NotificationMapper.toPersistence(data);
    const newEntity = await this.notificationsRepository.save(
      this.notificationsRepository.create(persistenceModel),
    );
    return NotificationMapper.toDomain(newEntity);
  }

  async findAll(): Promise<Notification[]> {
    const entities = await this.notificationsRepository.find();
    return entities.map((notification) =>
      NotificationMapper.toDomain(notification),
    );
  }

  async findById(id: Notification['id']): Promise<NullableType<Notification>> {
    const entity = await this.notificationsRepository.findOne({
      where: { id },
      relations: ['user', 'plant'],
    });
    return entity ? NotificationMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Notification['id'][]): Promise<Notification[]> {
    const entities = await this.notificationsRepository.find({
      where: { id: In(ids) },
      relations: ['user', 'plant'],
    });
    return entities.map((notification) =>
      NotificationMapper.toDomain(notification),
    );
  }

  async update(
    id: Notification['id'],
    payload: Partial<Notification>,
  ): Promise<Notification | null> {
    const entity = await this.notificationsRepository.findOne({
      where: { id },
    });
    if (!entity) return null;

    const updatedEntity = await this.notificationsRepository.save(
      this.notificationsRepository.create(
        NotificationMapper.toPersistence({
          ...NotificationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return NotificationMapper.toDomain(updatedEntity);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const entities = await this.notificationsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'plant'],
    });
    return entities.map((notification) =>
      NotificationMapper.toDomain(notification),
    );
  }
}

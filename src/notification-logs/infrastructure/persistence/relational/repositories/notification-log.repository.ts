import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { NotificationLogEntity } from '../entities/notification-log.entity';
import { NotificationLog } from '../../../../domain/notification-log';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { NotificationLogRepository } from '../../notification-logs.repository';
import { NotificationLogMapper } from '../mappers/notification-log';

@Injectable()
export class NotificationLogsRelationalRepository
  implements NotificationLogRepository
{
  constructor(
    @InjectRepository(NotificationLogEntity)
    private readonly repo: Repository<NotificationLogEntity>,
  ) {}

  async create(data: NotificationLog): Promise<NotificationLog> {
    const persistenceEntity = NotificationLogMapper.toPersistence(data);
    const entity = this.repo.create(persistenceEntity);
    const saved = await this.repo.save(entity);
    return NotificationLogMapper.toDomain(saved);
  }

  async findAll(): Promise<NotificationLog[]> {
    const entities = await this.repo.find();
    return entities.map(NotificationLogMapper.toDomain);
  }

  async findById(
    id: NotificationLog['id'],
  ): Promise<NullableType<NotificationLog>> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? NotificationLogMapper.toDomain(entity) : null;
  }

  async findByNotificationIds(
    notificationIds: string[],
  ): Promise<NotificationLog[]> {
    if (!notificationIds || notificationIds.length === 0) return [];
    const entities = await this.repo.find({
      where: { notificationId: In(notificationIds) },
    });
    return entities.map(NotificationLogMapper.toDomain);
  }

  async update(
    id: NotificationLog['id'],
    payload: Partial<NotificationLog>,
  ): Promise<NotificationLog | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;

    const updatedEntity = await this.repo.save(
      this.repo.create(
        NotificationLogMapper.toPersistence({
          ...NotificationLogMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NotificationLogMapper.toDomain(updatedEntity);
  }
}

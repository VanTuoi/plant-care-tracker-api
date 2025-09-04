import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { ReminderOption } from '../../../../domain/reminder-option';
import { ReminderOptionEntity } from '../entities/reminder-option.entity';
import { ReminderOptionRepository } from '../../reminder-option.repository';
import { ReminderOptionMapper } from '../mappers/reminder-option.mapper';

@Injectable()
export class ReminderOptionsRelationalRepository
  implements ReminderOptionRepository
{
  constructor(
    @InjectRepository(ReminderOptionEntity)
    private readonly reminderOptionsRepo: Repository<ReminderOptionEntity>,
  ) {}

  async create(data: Omit<ReminderOption, 'id'>): Promise<ReminderOption> {
    const persistenceModel = ReminderOptionMapper.toPersistence(
      data as ReminderOption,
    );
    const newEntity = await this.reminderOptionsRepo.save(
      this.reminderOptionsRepo.create(persistenceModel),
    );
    return ReminderOptionMapper.toDomain(newEntity);
  }

  async findById(
    id: ReminderOption['id'],
  ): Promise<NullableType<ReminderOption>> {
    const entity = await this.reminderOptionsRepo.findOne({ where: { id } });
    return entity ? ReminderOptionMapper.toDomain(entity) : null;
  }

  async findByUserId(
    userId: ReminderOption['userId'],
  ): Promise<ReminderOption[]> {
    const entities = await this.reminderOptionsRepo.find({
      where: { userId },
    });
    return entities.map((entity) => ReminderOptionMapper.toDomain(entity));
  }

  async findAllActive(): Promise<ReminderOption[]> {
    const entities = await this.reminderOptionsRepo.find({
      where: { isEnabled: true },
    });
    return entities.map((entity) => ReminderOptionMapper.toDomain(entity));
  }

  async getAll(): Promise<ReminderOption[]> {
    const entities = await this.reminderOptionsRepo.find();
    return entities.map((entity) => ReminderOptionMapper.toDomain(entity));
  }

  async update(
    id: ReminderOption['id'],
    payload: Partial<ReminderOption>,
  ): Promise<ReminderOption | null> {
    const entity = await this.reminderOptionsRepo.findOne({ where: { id } });
    if (!entity) return null;

    const updatedEntity = await this.reminderOptionsRepo.save(
      this.reminderOptionsRepo.create({
        ...entity,
        ...ReminderOptionMapper.toPersistence({
          ...ReminderOptionMapper.toDomain(entity),
          ...payload,
        }),
      }),
    );

    return ReminderOptionMapper.toDomain(updatedEntity);
  }
}

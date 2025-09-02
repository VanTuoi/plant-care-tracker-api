import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Fertilizer } from '../../../../domain/fertilizers';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FertilizerRepository } from '../../fertilizers.repository';
import { FertilizerMapper } from '../mappers/fertilizers.mapper';
import { FertilizerEntity } from '../entities/fertilizers.entity';

@Injectable()
export class FertilizersRelationalRepository implements FertilizerRepository {
  constructor(
    @InjectRepository(FertilizerEntity)
    private readonly repo: Repository<FertilizerEntity>,
  ) {}

  async create(data: Fertilizer): Promise<Fertilizer> {
    const persistenceEntity = FertilizerMapper.toPersistence(data);
    const entity = this.repo.create(persistenceEntity);
    const saved = await this.repo.save(entity);

    return FertilizerMapper.toDomain(saved);
  }

  async findAll(): Promise<Fertilizer[]> {
    const entities = await this.repo.find();
    return entities.map((fertilizer) => FertilizerMapper.toDomain(fertilizer));
  }

  async findById(id: Fertilizer['id']): Promise<NullableType<Fertilizer>> {
    const entity = await this.repo.findOne({
      where: { id: String(id) },
    });
    return entity ? FertilizerMapper.toDomain(entity) : null;
  }

  async findByPlantIds(plantIds: string[]): Promise<Fertilizer[]> {
    if (!plantIds || plantIds.length === 0) return [];
    const entities = await this.repo.find({
      where: {
        plant: { id: In(plantIds) },
      },
    });
    return entities.map(FertilizerMapper.toDomain);
  }

  async update(
    id: Fertilizer['id'],
    payload: Partial<Fertilizer>,
  ): Promise<Fertilizer | null> {
    const entity = await this.repo.findOne({
      where: { id: String(id) },
    });

    if (!entity) return null;

    const updatedEntity = await this.repo.save(
      this.repo.create(
        FertilizerMapper.toPersistence({
          ...FertilizerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return FertilizerMapper.toDomain(updatedEntity);
  }
}

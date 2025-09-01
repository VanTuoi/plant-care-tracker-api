import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { WaterEntity } from '../entities/water.entity';
import { Water } from '../../../../domain/water';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { WaterRepository } from '../water.repository';
import { WaterMapper } from '../mappers/water';

@Injectable()
export class WatersRelationalRepository implements WaterRepository {
  constructor(
    @InjectRepository(WaterEntity)
    private readonly repo: Repository<WaterEntity>,
  ) {}

  async create(
    data: Omit<Water, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Water> {
    const persistenceEntity = WaterMapper.toPersistence(data);
    const entity = this.repo.create(persistenceEntity);
    const saved = await this.repo.save(entity);

    return WaterMapper.toDomain(saved);
  }

  async findAll(): Promise<Water[]> {
    const entities = await this.repo.find();
    return entities.map((water) => WaterMapper.toDomain(water));
  }

  async findById(id: Water['id']): Promise<NullableType<Water>> {
    const entity = await this.repo.findOne({
      where: { id: String(id) },
    });
    return entity ? WaterMapper.toDomain(entity) : null;
  }

  async findByPlantIds(plantIds: string[]): Promise<Water[]> {
    if (!plantIds || plantIds.length === 0) return [];
    const entities = await this.repo.find({
      where: {
        plant: { id: In(plantIds) },
      },
    });
    return entities.map(WaterMapper.toDomain);
  }

  async update(
    id: Water['id'],
    payload: Partial<Water>,
  ): Promise<Water | null> {
    const entity = await this.repo.findOne({
      where: { id: String(id) },
    });

    if (!entity) return null;

    const updatedEntity = await this.repo.save(
      this.repo.create(
        WaterMapper.toPersistence({
          ...WaterMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WaterMapper.toDomain(updatedEntity);
  }
}

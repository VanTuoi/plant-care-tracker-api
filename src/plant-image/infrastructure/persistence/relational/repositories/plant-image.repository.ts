import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantImageEntity } from '../entities/plant-image.entity';
import { PlantImageRepository } from '../../plant-image.repository';
import { PlantImage } from '../../../../domain/plant-image';
import { PlantImageMapper } from '../mappers/plant-image.mapper';

@Injectable()
export class PlantImageRelationalRepository implements PlantImageRepository {
  constructor(
    @InjectRepository(PlantImageEntity)
    private readonly repo: Repository<PlantImageEntity>,
  ) {}

  async findAllByPlantId(
    plantId: PlantImage['plantId'],
  ): Promise<PlantImage[]> {
    const entities = await this.repo.find({
      where: { plantId },
      order: { createdAt: 'ASC' },
    });
    return entities.map(PlantImageMapper.toDomain);
  }

  async create(
    data: Omit<PlantImage, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<PlantImage> {
    const persistenceEntity = PlantImageMapper.toPersistence({
      ...data,
    } as PlantImage);

    const saved = await this.repo.save(this.repo.create(persistenceEntity));
    return PlantImageMapper.toDomain(saved);
  }

  async deleteById(id: PlantImage['id']): Promise<void> {
    await this.repo.softDelete({ id });
  }
}

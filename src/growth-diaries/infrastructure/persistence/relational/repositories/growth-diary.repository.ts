import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrowthDiaryEntity } from '../entities/growth-diary.entity';
import { GrowthDiaryRepository } from '../../growth-diary.repository';
import { GrowthDiary } from '../../../../domain/growth-diary';
import { GrowthDiaryMapper } from '../mappers/growth-diary.mapper';

@Injectable()
export class GrowthDiaryRelationalRepository implements GrowthDiaryRepository {
  constructor(
    @InjectRepository(GrowthDiaryEntity)
    private readonly repo: Repository<GrowthDiaryEntity>,
  ) {}

  async findAllByPlantId(
    plantId: GrowthDiary['plantId'],
  ): Promise<GrowthDiary[]> {
    const entities = await this.repo.find({
      where: { plantId },
      order: { createdAt: 'ASC' },
    });
    return entities.map(GrowthDiaryMapper.toDomain);
  }

  async getAll(): Promise<GrowthDiary[]> {
    const entities = await this.repo
      .createQueryBuilder('diary')
      .innerJoinAndSelect('diary.plant', 'plant', 'plant.deletedAt IS NULL')
      .leftJoinAndSelect('diary.file', 'file')
      .orderBy('diary.createdAt', 'DESC')
      .getMany();

    return entities.map(GrowthDiaryMapper.toDomain);
  }

  async getById(id: GrowthDiary['id']): Promise<GrowthDiary | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;
    return GrowthDiaryMapper.toDomain(entity);
  }

  async findByFileId(fileId: string): Promise<GrowthDiary | null> {
    return this.repo.findOne({ where: { fileId } });
  }

  async create(
    data: Omit<GrowthDiary, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<GrowthDiary> {
    const persistenceEntity = GrowthDiaryMapper.toPersistence({
      ...data,
    } as GrowthDiary);

    const saved = await this.repo.save(this.repo.create(persistenceEntity));
    return GrowthDiaryMapper.toDomain(saved);
  }

  async deleteById(id: GrowthDiary['id']): Promise<void> {
    await this.repo.softDelete({ id });
  }
}

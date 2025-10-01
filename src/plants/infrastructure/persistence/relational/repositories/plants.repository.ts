import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere } from 'typeorm';

import { PlantEntity } from '../entities/plants.entity';
import { Plant } from '../../../../domain/plant';
import { PlantMapper } from '../mappers/plant.mapper';
import { PlantRepository } from '../../plants.repository';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FilterPlantDto, SortPlantDto } from '../../../../dto/query-plant.dto';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PlantsRelationalRepository implements PlantRepository {
  constructor(
    @InjectRepository(PlantEntity)
    private readonly plantsRepository: Repository<PlantEntity>,
  ) {}

  async create(data: Plant): Promise<Plant> {
    const persistenceModel = PlantMapper.toPersistence(data);
    const newEntity = await this.plantsRepository.save(
      this.plantsRepository.create(persistenceModel),
    );
    return PlantMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPlantDto | null;
    sortOptions?: SortPlantDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Plant[]> {
    const where: FindOptionsWhere<PlantEntity> = {};

    if (filterOptions?.speciesId)
      where.species = { id: filterOptions.speciesId };
    if (filterOptions?.siteId) where.site = { id: filterOptions.siteId };
    if (filterOptions?.userId) where.user = { id: filterOptions.userId };
    if (filterOptions?.name) where.name = filterOptions.name;

    const entities = await this.plantsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      order: sortOptions?.reduce(
        (acc, sort) => ({ ...acc, [sort.orderBy]: sort.order }),
        {},
      ),
      relations: ['species', 'user', 'site'],
    });

    return entities.map((plant) => PlantMapper.toDomain(plant));
  }

  async findById(id: Plant['id']): Promise<NullableType<Plant>> {
    const entity = await this.plantsRepository.findOne({
      where: { id },
      relations: ['species', 'user', 'site'],
    });
    return entity ? PlantMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Plant['id'][]): Promise<Plant[]> {
    const entities = await this.plantsRepository.find({
      where: { id: In(ids) },
      relations: ['species', 'user', 'site'],
    });
    return entities.map((plant) => PlantMapper.toDomain(plant));
  }

  async update(
    id: Plant['id'],
    payload: Partial<Plant>,
  ): Promise<Plant | null> {
    const entity = await this.plantsRepository.findOne({ where: { id } });
    if (!entity) return null;

    const updatedEntity = await this.plantsRepository.save(
      this.plantsRepository.create(
        PlantMapper.toPersistence({
          ...PlantMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );
    return PlantMapper.toDomain(updatedEntity);
  }

  async remove(id: Plant['id']): Promise<void> {
    await this.plantsRepository.softDelete(id);
  }

  async findByPlantIds(ids: Plant['id'][]): Promise<Plant[]> {
    const entities = await this.plantsRepository.find({
      where: { id: In(ids) },
      relations: ['species', 'user', 'site'],
    });
    return entities.map((plant) => PlantMapper.toDomain(plant));
  }

  async findByUserId(userId: string): Promise<Plant[]> {
    const entities = await this.plantsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['species', 'user', 'site'],
    });
    return entities.map((plant) => PlantMapper.toDomain(plant));
  }
}

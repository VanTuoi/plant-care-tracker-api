import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In } from 'typeorm';

import { SpeciesEntity } from '../entities/species.entity';
import { SpeciesRepository } from '../species.repository';
import { Species } from '../../../../domain/species';
import { SpeciesMapper } from '../mappers/species.mapper';
import {
  FilterSpeciesDto,
  SortSpeciesDto,
} from '../../../../dto/query-species.dto';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { NullableType } from '../../../../../utils/types/nullable.type';

@Injectable()
export class SpeciesRelationalRepository implements SpeciesRepository {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly repo: Repository<SpeciesEntity>,
  ) {}

  async create(
    data: Omit<Species, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Species> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return SpeciesMapper.toDomain(saved);
  }

  async findById(id: Species['id']): Promise<NullableType<Species>> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? SpeciesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Species['id'][]): Promise<Species[]> {
    const entities = await this.repo.find({ where: { id: In(ids) } });
    return entities.map(SpeciesMapper.toDomain);
  }

  async findAll(): Promise<Species[]> {
    const entities = await this.repo.find();
    return entities.map(SpeciesMapper.toDomain);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSpeciesDto | null;
    sortOptions?: SortSpeciesDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Species[]> {
    const where: FindOptionsWhere<SpeciesEntity> = {};

    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }

    if (filterOptions?.scientificName) {
      where.scientificName = filterOptions.scientificName;
    }

    const entities = await this.repo.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      order: sortOptions?.reduce(
        (acc, sort) => ({
          ...acc,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map(SpeciesMapper.toDomain);
  }

  async update(
    id: Species['id'],
    payload: Partial<Species>,
  ): Promise<Species | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;

    const updatedEntity = await this.repo.save(
      this.repo.create({
        ...SpeciesMapper.toDomain(entity),
        ...payload,
      }),
    );

    return SpeciesMapper.toDomain(updatedEntity);
  }

  async remove(id: Species['id']): Promise<void> {
    await this.repo.softDelete(id);
  }

  async importFromJson(
    data: Omit<Species, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Species[]> {
    const entities = this.repo.create(data);
    const savedEntities = await this.repo.save(entities);
    return savedEntities.map(SpeciesMapper.toDomain);
  }

  async exportToJson(): Promise<Species[]> {
    const entities = await this.repo.find();
    return entities.map(SpeciesMapper.toDomain);
  }
}

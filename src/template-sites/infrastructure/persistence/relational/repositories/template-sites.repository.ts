import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In } from 'typeorm';

import { TemplateSiteEntity } from '../entities/template-sites.entity';
import { TemplateSiteRepository } from '../../template-sites.repository';
import { TemplateSite } from '../../../../domain/template-site';
import { TemplateSiteMapper } from '../mappers/template-sites.mapper';
import {
  FilterTemplateSiteDto,
  SortTemplateSiteDto,
} from '../../../../dto/query-template-site.dto';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { NullableType } from '../../../../../utils/types/nullable.type';

@Injectable()
export class TemplateSiteRelationalRepository
  implements TemplateSiteRepository
{
  constructor(
    @InjectRepository(TemplateSiteEntity)
    private readonly repo: Repository<TemplateSiteEntity>,
  ) {}

  async create(
    data: Omit<TemplateSite, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<TemplateSite> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return TemplateSiteMapper.toDomain(saved);
  }

  async findById(id: TemplateSite['id']): Promise<NullableType<TemplateSite>> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? TemplateSiteMapper.toDomain(entity) : null;
  }

  async findByIds(ids: TemplateSite['id'][]): Promise<TemplateSite[]> {
    const entities = await this.repo.find({ where: { id: In(ids) } });
    return entities.map(TemplateSiteMapper.toDomain);
  }

  async findAll(): Promise<TemplateSite[]> {
    const entities = await this.repo.find();
    return entities.map(TemplateSiteMapper.toDomain);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTemplateSiteDto | null;
    sortOptions?: SortTemplateSiteDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TemplateSite[]> {
    const where: FindOptionsWhere<TemplateSiteEntity> = {};

    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }
    if (filterOptions?.description) {
      where.description = filterOptions.description;
    }
    if (filterOptions?.sunlight) {
      where.sunlight = filterOptions.sunlight;
    }
    if (filterOptions?.lightType) {
      where.lightType = filterOptions.lightType;
    }
    if (filterOptions?.soilType) {
      where.soilType = filterOptions.soilType;
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

    return entities.map(TemplateSiteMapper.toDomain);
  }

  async update(
    id: TemplateSite['id'],
    payload: Partial<TemplateSite>,
  ): Promise<TemplateSite | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;

    const updatedEntity = await this.repo.save(
      this.repo.create({
        ...TemplateSiteMapper.toDomain(entity),
        ...payload,
      }),
    );

    return TemplateSiteMapper.toDomain(updatedEntity);
  }

  async remove(id: TemplateSite['id']): Promise<void> {
    await this.repo.softDelete(id);
  }

  async importFromJson(
    data: Omit<TemplateSite, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[],
  ): Promise<TemplateSite[]> {
    const entities = this.repo.create(data);
    const savedEntities = await this.repo.save(entities);
    return savedEntities.map(TemplateSiteMapper.toDomain);
  }

  async exportToJson(): Promise<TemplateSite[]> {
    const entities = await this.repo.find();
    return entities.map(TemplateSiteMapper.toDomain);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In } from 'typeorm';

import { SiteEntity } from '../entities/site.entity';
import { SiteMapper } from '../mappers/site.mapper';
import { SiteRepository } from '../../site.repository';
import { Site } from '../../../../domain/site';
import { FilterSiteDto, SortSiteDto } from '../../../../dto/query-site.dto';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { NullableType } from '../../../../../utils/types/nullable.type';

@Injectable()
export class SitesRelationalRepository implements SiteRepository {
  constructor(
    @InjectRepository(SiteEntity)
    private readonly sitesRepository: Repository<SiteEntity>,
  ) {}

  async create(data: Site): Promise<Site> {
    const persistenceModel = SiteMapper.toPersistence(data);
    const newEntity = await this.sitesRepository.save(
      this.sitesRepository.create(persistenceModel),
    );
    return SiteMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSiteDto | null;
    sortOptions?: SortSiteDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Site[]> {
    const where: FindOptionsWhere<SiteEntity> = {};

    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }

    const entities = await this.sitesRepository.find({
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

    return entities.map((site) => SiteMapper.toDomain(site));
  }

  async findById(id: Site['id']): Promise<NullableType<Site>> {
    const entity = await this.sitesRepository.findOne({
      where: { id: String(id) },
    });
    return entity ? SiteMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Site['id'][]): Promise<Site[]> {
    const entities = await this.sitesRepository.find({
      where: { id: In(ids) },
    });
    return entities.map((site) => SiteMapper.toDomain(site));
  }

  async update(id: Site['id'], payload: Partial<Site>): Promise<Site | null> {
    const entity = await this.sitesRepository.findOne({
      where: { id: String(id) },
    });
    if (!entity) return null;

    const updatedEntity = await this.sitesRepository.save(
      this.sitesRepository.create(
        SiteMapper.toPersistence({
          ...SiteMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SiteMapper.toDomain(updatedEntity);
  }

  async remove(id: Site['id']): Promise<void> {
    await this.sitesRepository.delete(id);
  }
}

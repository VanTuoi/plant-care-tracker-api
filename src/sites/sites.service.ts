import { Injectable } from '@nestjs/common';
import { SiteRepository } from './infrastructure/persistence/site.repository';
import { Site } from './domain/site';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterSiteDto, SortSiteDto } from './dto/query-site.dto';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(private readonly sitesRepository: SiteRepository) {}

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    // check role or user id
    return this.sitesRepository.create({
      name: createSiteDto.name,
      description: createSiteDto.description,
      sunlight: createSiteDto.sunlight,
      lightDuration: createSiteDto.lightDuration,
      lightType: createSiteDto.lightType,
      soilMoisture: createSiteDto.soilMoisture,
      soilType: createSiteDto.soilType,
      phSoil: createSiteDto.phSoil,
      temperature: createSiteDto.temperature,
      humidity: createSiteDto.humidity,
      windExposure: createSiteDto.windExposure,
      latitude: createSiteDto.latitude,
      longitude: createSiteDto.longitude,
      altitude: createSiteDto.altitude,
      userId: createSiteDto.userId,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSiteDto | null;
    sortOptions?: SortSiteDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Site[]> {
    return this.sitesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Site['id']): Promise<NullableType<Site>> {
    return this.sitesRepository.findById(id);
  }

  findByIds(ids: Site['id'][]): Promise<Site[]> {
    return this.sitesRepository.findByIds(ids);
  }

  async update(
    id: Site['id'],
    updateSiteDto: UpdateSiteDto,
  ): Promise<Site | null> {
    return this.sitesRepository.update(id, {
      name: updateSiteDto.name,
      description: updateSiteDto.description,
      sunlight: updateSiteDto.sunlight,
      lightDuration: updateSiteDto.lightDuration,
      lightType: updateSiteDto.lightType,
      soilMoisture: updateSiteDto.soilMoisture,
      soilType: updateSiteDto.soilType,
      phSoil: updateSiteDto.phSoil,
      temperature: updateSiteDto.temperature,
      humidity: updateSiteDto.humidity,
      windExposure: updateSiteDto.windExposure,
      latitude: updateSiteDto.latitude,
      longitude: updateSiteDto.longitude,
      altitude: updateSiteDto.altitude,
      userId: updateSiteDto.userId,
    });
  }

  async remove(id: Site['id']): Promise<void> {
    await this.sitesRepository.remove(id);
  }
}

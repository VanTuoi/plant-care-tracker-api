import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TemplateSite } from './domain/template-site';
import { TemplateSiteRepository } from './infrastructure/persistence/template-sites.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import {
  FilterTemplateSiteDto,
  SortTemplateSiteDto,
} from './dto/query-template-site.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTemplateSiteDto } from './dto/create-template-site.dto';
import { UpdateTemplateSiteDto } from './dto/update-template-site.dto';
import { LightType, SoilType, Sunlight } from './template-sites.enum';

@Injectable()
export class TemplateSitesService {
  constructor(
    private readonly templateSiteRepository: TemplateSiteRepository,
  ) {}

  async create(dto: CreateTemplateSiteDto): Promise<TemplateSite> {
    return this.templateSiteRepository.create(dto);
  }

  async findById(id: TemplateSite['id']): Promise<TemplateSite> {
    const entity = await this.templateSiteRepository.findById(id);
    if (!entity) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'templateSiteNotFound' },
      });
    }
    return entity;
  }

  async findByIds(ids: TemplateSite['id'][]): Promise<TemplateSite[]> {
    return this.templateSiteRepository.findByIds(ids);
  }

  async findAll(): Promise<TemplateSite[]> {
    return this.templateSiteRepository.findAll();
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
    return this.templateSiteRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async update(
    id: TemplateSite['id'],
    dto: UpdateTemplateSiteDto,
  ): Promise<TemplateSite | null> {
    const entity = await this.templateSiteRepository.findById(id);
    if (!entity) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'templateSiteNotFound' },
      });
    }

    return this.templateSiteRepository.update(id, dto);
  }

  async remove(id: TemplateSite['id']): Promise<void> {
    const entity = await this.templateSiteRepository.findById(id);
    if (!entity) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'templateSiteNotFound' },
      });
    }
    await this.templateSiteRepository.remove(id);
  }

  async importFromJson(
    data: Omit<TemplateSite, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[],
  ): Promise<TemplateSite[]> {
    const dtos = data.map((item) =>
      plainToInstance(CreateTemplateSiteDto, item),
    );

    const allErrors: {
      itemIndex: number;
      fieldErrors: Record<string, string>;
    }[] = [];

    for (let i = 0; i < dtos.length; i++) {
      const dto = dtos[i];
      const errors = await validate(dto, { skipMissingProperties: false });
      if (errors.length) {
        const formattedErrors: Record<string, string> = {};
        errors.forEach((err) => {
          if (err.property && err.constraints) {
            formattedErrors[err.property] = Object.values(err.constraints).join(
              ', ',
            );
          }
        });
        allErrors.push({
          itemIndex: i,
          fieldErrors: formattedErrors,
        });
      }
    }

    if (allErrors.length > 0) {
      throw new UnprocessableEntityException({
        status: 422,
        errors: allErrors,
      });
    }

    return this.templateSiteRepository.importFromJson(dtos);
  }

  async exportToJson(): Promise<TemplateSite[]> {
    return this.templateSiteRepository.exportToJson();
  }

  getSampleJson(): Omit<
    TemplateSite,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >[] {
    return [
      {
        name: 'Ban công mẫu',
        description: 'Khu vực đặt cây cảnh mẫu',
        sunlight: Sunlight.FULL_SUN,
        lightDuration: 6,
        lightType: LightType.NATURAL,
        soilMoisture: 50,
        soilType: SoilType.CLAY,
        phSoil: 6.5,
        temperature: 28,
        humidity: 65,
        windExposure: 3.5,
        latitude: 10.0452,
        longitude: 105.7469,
        altitude: 15,
      },
    ];
  }
}

import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Species } from './domain/species';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterSpeciesDto, SortSpeciesDto } from './dto/query-species.dto';
import { SpeciesRepository } from './infrastructure/persistence/relational/species.repository';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class SpeciesService {
  constructor(private readonly speciesRepository: SpeciesRepository) {}

  async create(dto: CreateSpeciesDto): Promise<Species> {
    return this.speciesRepository.create(dto);
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
    return this.speciesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async findById(id: Species['id']): Promise<Species> {
    const entity = await this.speciesRepository.findById(id);
    if (!entity) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'speciesNotFound' },
      });
    }
    return entity;
  }

  async findByIds(ids: Species['id'][]): Promise<Species[]> {
    return this.speciesRepository.findByIds(ids);
  }

  async update(
    id: Species['id'],
    dto: UpdateSpeciesDto,
  ): Promise<Species | null> {
    return this.speciesRepository.update(id, dto);
  }

  async remove(id: Species['id']): Promise<void> {
    await this.speciesRepository.remove(id);
  }

  async importFromJson(
    data: Omit<Species, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Species[]> {
    const dtos = data.map((item) => plainToInstance(CreateSpeciesDto, item));

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

    return this.speciesRepository.importFromJson(dtos);
  }

  async exportToJson(): Promise<Species[]> {
    return this.speciesRepository.exportToJson();
  }

  getSampleJson(): Omit<
    Species,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >[] {
    return [
      {
        name: 'Cây Mẫu',
        scientificName: 'Sample plantus',
        imageId: '11111111-2222-3333-4444-555555555555',
        wateringFrequency: 1,
        wateringAmount: 100,
        wateringMethod: 'tưới gốc | phun sương',
        fertilizingFrequency: 1,
        fertilizingAmount: 20,
        fertilizingMethod: 'bón gốc | phun lá',
        fertilizerType: 'NPK | hữu cơ',
        sunlightNeed: 'full_sun | partial_shade',
        difficultyLevel: 'dễ | trung bình',
      },
    ];
  }
}

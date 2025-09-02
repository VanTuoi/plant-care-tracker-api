import { DeepPartial } from 'typeorm';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { FilterPlantDto, SortPlantDto } from '../../dto/query-plant.dto';
import { Plant } from '../../domain/plant';

export abstract class PlantRepository {
  abstract create(
    data: Omit<Plant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Plant>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPlantDto | null;
    sortOptions?: SortPlantDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Plant[]>;

  abstract findById(id: Plant['id']): Promise<NullableType<Plant>>;
  abstract findByIds(ids: Plant['id'][]): Promise<Plant[]>;

  abstract update(
    id: Plant['id'],
    payload: DeepPartial<Plant>,
  ): Promise<Plant | null>;

  abstract remove(id: Plant['id']): Promise<void>;

  abstract findByUserId(userId: string): Promise<Plant[]>;
}

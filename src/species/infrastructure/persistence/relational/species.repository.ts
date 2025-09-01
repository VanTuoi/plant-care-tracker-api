import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Species } from '../../../domain/species';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import {
  FilterSpeciesDto,
  SortSpeciesDto,
} from '../../../dto/query-species.dto';

export abstract class SpeciesRepository {
  abstract create(
    data: Omit<Species, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Species>;

  abstract findById(id: Species['id']): Promise<NullableType<Species>>;
  abstract findByIds(ids: Species['id'][]): Promise<Species[]>;

  abstract findAll(): Promise<Species[]>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSpeciesDto | null;
    sortOptions?: SortSpeciesDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Species[]>;

  abstract update(
    id: Species['id'],
    payload: DeepPartial<Species>,
  ): Promise<Species | null>;

  abstract remove(id: Species['id']): Promise<void>;

  abstract importFromJson(
    data: Omit<Species, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[],
  ): Promise<Species[]>;

  abstract exportToJson(): Promise<Species[]>;
}

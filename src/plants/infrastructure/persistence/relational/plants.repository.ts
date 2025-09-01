import { DeepPartial } from 'typeorm';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';

export abstract class PlantRepository {
  abstract create(
    data: Omit<any, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<any>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: any | null;
    sortOptions?: any[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<any[]>;

  abstract findById(id: any['id']): Promise<NullableType<any>>;
  abstract findByIds(ids: any['id'][]): Promise<any[]>;

  abstract update(
    id: any['id'],
    payload: DeepPartial<any>,
  ): Promise<any | null>;

  abstract remove(id: any['id']): Promise<void>;

  abstract findByUserId(userId: any): Promise<any[]>;
}

import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

import { TemplateSite } from '../../domain/template-site';
import {
  FilterTemplateSiteDto,
  SortTemplateSiteDto,
} from '../../dto/query-template-site.dto';

export abstract class TemplateSiteRepository {
  abstract create(
    data: Omit<TemplateSite, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<TemplateSite>;

  abstract findById(
    id: TemplateSite['id'],
  ): Promise<NullableType<TemplateSite>>;

  abstract findByIds(ids: TemplateSite['id'][]): Promise<TemplateSite[]>;

  abstract findAll(): Promise<TemplateSite[]>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTemplateSiteDto | null;
    sortOptions?: SortTemplateSiteDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TemplateSite[]>;

  abstract update(
    id: TemplateSite['id'],
    payload: DeepPartial<TemplateSite>,
  ): Promise<TemplateSite | null>;

  abstract remove(id: TemplateSite['id']): Promise<void>;

  abstract importFromJson(
    data: Omit<TemplateSite, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[],
  ): Promise<TemplateSite[]>;

  abstract exportToJson(): Promise<TemplateSite[]>;
}

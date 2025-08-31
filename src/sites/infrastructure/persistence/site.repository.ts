import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Site } from '../../domain/site';
import { FilterSiteDto, SortSiteDto } from '../../dto/query-site.dto';

export abstract class SiteRepository {
  abstract create(
    data: Omit<Site, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Site>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSiteDto | null;
    sortOptions?: SortSiteDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Site[]>;

  abstract findById(id: Site['id']): Promise<NullableType<Site>>;
  abstract findByIds(ids: Site['id'][]): Promise<Site[]>;

  abstract update(
    id: Site['id'],
    payload: DeepPartial<Site>,
  ): Promise<Site | null>;

  abstract remove(id: Site['id']): Promise<void>;
}

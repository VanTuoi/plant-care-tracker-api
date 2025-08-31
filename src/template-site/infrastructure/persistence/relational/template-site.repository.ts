import { TemplateSite } from '../../../domain/template-site';

export abstract class TemplateSiteRepository {
  abstract findById(id: TemplateSite['id']): Promise<TemplateSite | null>;

  abstract create(
    data: Omit<TemplateSite, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TemplateSite>;

  abstract findAll(): Promise<TemplateSite[]>;
}

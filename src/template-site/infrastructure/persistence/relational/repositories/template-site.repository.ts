import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateSiteEntity } from '../entities/template-site.entity';
import { TemplateSiteRepository } from '../template-site.repository';
import { TemplateSite } from '../../../../domain/template-site';
import { TemplateSiteMapper } from '../mappers/template-site.mapper';

@Injectable()
export class TemplateSiteRelationalRepository
  implements TemplateSiteRepository
{
  constructor(
    @InjectRepository(TemplateSiteEntity)
    private readonly repo: Repository<TemplateSiteEntity>,
  ) {}

  async findById(id: TemplateSite['id']): Promise<TemplateSite | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? TemplateSiteMapper.toDomain(entity) : null;
  }

  async create(
    data: Omit<TemplateSite, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TemplateSite> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return TemplateSiteMapper.toDomain(saved);
  }

  async findAll(): Promise<TemplateSite[]> {
    const entities = await this.repo.find();
    return entities.map((e) => TemplateSiteMapper.toDomain(e));
  }
}

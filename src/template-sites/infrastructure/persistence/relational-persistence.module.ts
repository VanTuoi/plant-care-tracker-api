import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateSiteEntity } from './relational/entities/template-sites.entity';
import { TemplateSiteRepository } from './template-sites.repository';
import { TemplateSiteRelationalRepository } from './relational/repositories/template-sites.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateSiteEntity])],
  providers: [
    {
      provide: TemplateSiteRepository,
      useClass: TemplateSiteRelationalRepository,
    },
  ],
  exports: [TemplateSiteRepository],
})
export class RelationalTemplateSitePersistenceModule {}

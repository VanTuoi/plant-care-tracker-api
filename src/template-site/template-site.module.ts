import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateSiteEntity } from './infrastructure/persistence/relational/entities/template-site.entity';
import { TemplateSiteRepository } from './infrastructure/persistence/relational/template-site.repository';
import { TemplateSiteRelationalRepository } from './infrastructure/persistence/relational/repositories/template-site.repository';

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
export class TemplateSiteModule {}

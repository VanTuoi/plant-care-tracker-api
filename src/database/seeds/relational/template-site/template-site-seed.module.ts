import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateSiteSeedService } from './template-site-seed.service';
import { TemplateSiteEntity } from '../../../../template-site/infrastructure/persistence/relational/entities/template-site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateSiteEntity])],
  providers: [TemplateSiteSeedService],
  exports: [TemplateSiteSeedService],
})
export class TemplateSiteSeedModule {}

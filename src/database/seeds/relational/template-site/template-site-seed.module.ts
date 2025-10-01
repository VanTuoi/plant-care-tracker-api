import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateSiteSeedService } from './template-site-seed.service';
import { TemplateSiteEntity } from '../../../../template-sites/infrastructure/persistence/relational/entities/template-sites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateSiteEntity])],
  providers: [TemplateSiteSeedService],
  exports: [TemplateSiteSeedService],
})
export class TemplateSiteSeedModule {}

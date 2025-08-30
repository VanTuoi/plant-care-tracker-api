import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from './entities/site.entity';
import { SitesRelationalRepository } from './repositories/site.repository';
import { SiteRepository } from '../site.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity])],
  providers: [
    {
      provide: SiteRepository,
      useClass: SitesRelationalRepository,
    },
  ],
  exports: [SiteRepository],
})
export class RelationalSitePersistenceModule {}

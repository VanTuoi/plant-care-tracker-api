import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from '../../../../sites/infrastructure/persistence/relational/entities/site.entity';
import { SiteSeedService } from './site-seed.service';
import { TemplateSiteEntity } from '../../../../template-sites/infrastructure/persistence/relational/entities/template-sites.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteEntity, TemplateSiteEntity, UserEntity]),
  ],
  providers: [SiteSeedService],
  exports: [SiteSeedService],
})
export class SiteSeedModule {}

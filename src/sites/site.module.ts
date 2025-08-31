import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { SitesController } from './site.controller';
import { SitesService } from './sites.service';
import { RelationalSitePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { TemplateSiteModule } from '../template-site/template-site.module';

const infrastructurePersistenceModule = RelationalSitePersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    UsersModule,
    FilesModule,
    TemplateSiteModule,
  ],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService, infrastructurePersistenceModule],
})
export class SitesModule {}

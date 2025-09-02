import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { RelationalSitePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { TemplateSitesModule } from '../template-sites/template-sites.module';

const infrastructurePersistenceModule = RelationalSitePersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    UsersModule,
    FilesModule,
    TemplateSitesModule,
  ],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService],
})
export class SitesModule {}

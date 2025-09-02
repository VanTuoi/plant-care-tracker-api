import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { UsersModule } from '../users/users.module';
import { TemplateSitesController } from './template-sites.controller';
import { TemplateSitesService } from './template-sites.service';
import { RelationalTemplateSitePersistenceModule } from './infrastructure/persistence/relational-persistence.module';

const infrastructurePersistenceModule = RelationalTemplateSitePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule, FilesModule],
  controllers: [TemplateSitesController],
  providers: [TemplateSitesService],
  exports: [TemplateSitesService, infrastructurePersistenceModule],
})
export class TemplateSitesModule {}

import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { WatersService } from './waters.service';
import { WatersController } from './waters.controller';
import { RelationalWaterPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PlantsModule } from '../plants/plants.module';

const infrastructurePersistenceModule = RelationalWaterPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule, PlantsModule],
  controllers: [WatersController],
  providers: [WatersService],
  exports: [WatersService, infrastructurePersistenceModule],
})
export class WatersModule {}

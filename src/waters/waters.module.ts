import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { WatersService } from './waters.service';
import { WatersController } from './waters.controller';
import { RelationalWaterPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PlantsModule } from '../plants/plants.module';
import { WateringDecisionService } from './domain/services/watering-decision.service';

const infrastructurePersistenceModule = RelationalWaterPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule, PlantsModule],
  controllers: [WatersController],
  providers: [WatersService, WateringDecisionService],
  exports: [
    WatersService,
    WateringDecisionService,
    infrastructurePersistenceModule,
  ],
})
export class WatersModule {}

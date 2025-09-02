import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { FertilizersService } from './fertilizers.service';
import { FertilizersController } from './fertilizers.controller';
import { RelationalFertilizerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PlantsModule } from '../plants/plants.module';

const infrastructurePersistenceModule = RelationalFertilizerPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule, PlantsModule],
  controllers: [FertilizersController],
  providers: [FertilizersService],
  exports: [FertilizersService, infrastructurePersistenceModule],
})
export class FertilizersModule {}

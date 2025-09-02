import { Module } from '@nestjs/common';
import { RelationalPlantPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { UsersModule } from '../users/users.module';
import { SpeciesModule } from '../species/species.module';

const infrastructurePersistenceModule = RelationalPlantPersistenceModule;

@Module({
  imports: [UsersModule, SpeciesModule, infrastructurePersistenceModule],
  controllers: [PlantsController],
  providers: [PlantsService],
  exports: [infrastructurePersistenceModule, PlantsService],
})
export class PlantsModule {}

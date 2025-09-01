import { Module } from '@nestjs/common';
import { RelationalPlantPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalPlantPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  exports: [infrastructurePersistenceModule],
})
export class PlantsModule {}

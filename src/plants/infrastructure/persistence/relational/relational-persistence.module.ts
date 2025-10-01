import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantEntity } from './entities/plants.entity';
import { PlantRepository } from '../plants.repository';
import { PlantsRelationalRepository } from './repositories/plants.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlantEntity])],
  providers: [
    {
      provide: PlantRepository,
      useClass: PlantsRelationalRepository,
    },
  ],
  exports: [PlantRepository],
})
export class RelationalPlantPersistenceModule {}

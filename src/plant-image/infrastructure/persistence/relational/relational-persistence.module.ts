import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantImageRepository } from '../plant-image.repository';
import { PlantImageRelationalRepository } from './repositories/plant-image.repository';
import { PlantImageEntity } from './entities/plant-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantImageEntity])],
  providers: [
    {
      provide: PlantImageRepository,
      useClass: PlantImageRelationalRepository,
    },
  ],
  exports: [PlantImageRepository],
})
export class RelationalPlantImagePersistenceModule {}

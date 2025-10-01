import { Module, forwardRef } from '@nestjs/common';
import { PlantImageService } from './plant-image.service';
import { RelationalPlantImagePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';
import { PlantImageController } from './plant-image.controller';
import { PlantsModule } from '../plants/plants.module';

@Module({
  imports: [
    RelationalPlantImagePersistenceModule,
    FilesModule,
    forwardRef(() => PlantsModule),
  ],
  controllers: [PlantImageController],
  providers: [PlantImageService],
  exports: [PlantImageService, RelationalPlantImagePersistenceModule],
})
export class PlantImageModule {}

import { Module, forwardRef } from '@nestjs/common';
import { RelationalPlantPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { UsersModule } from '../users/users.module';
import { SpeciesModule } from '../species/species.module';
import { SitesModule } from '../sites/sites.module';
import { PlantImageModule } from '../plant-image/plant-image.module';

@Module({
  imports: [
    UsersModule,
    SpeciesModule,
    SitesModule,
    forwardRef(() => PlantImageModule),
    RelationalPlantPersistenceModule,
  ],
  controllers: [PlantsController],
  providers: [PlantsService],
  exports: [RelationalPlantPersistenceModule, PlantsService],
})
export class PlantsModule {}

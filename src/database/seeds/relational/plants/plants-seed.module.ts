import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantEntity } from '../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { PlantSeedService } from './plants-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SpeciesEntity } from '../../../../species/infrastructure/persistence/relational/entities/species.entity';
import { SiteEntity } from '../../../../sites/infrastructure/persistence/relational/entities/site.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlantEntity,
      SpeciesEntity,
      SiteEntity,
      UserEntity,
    ]),
  ],
  providers: [PlantSeedService],
  exports: [PlantSeedService],
})
export class PlantSeedModule {}

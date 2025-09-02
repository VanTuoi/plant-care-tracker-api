import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesSeedService } from './species-seed.service';
import { SpeciesEntity } from '../../../../species/infrastructure/persistence/relational/entities/species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity])],
  providers: [SpeciesSeedService],
  exports: [SpeciesSeedService],
})
export class SpeciesSeedModule {}

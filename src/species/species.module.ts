import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesEntity } from './infrastructure/persistence/relational/entities/species.entity';
import { SpeciesRepository } from './infrastructure/persistence/relational/species.repository';
import { SpeciesRelationalRepository } from './infrastructure/persistence/relational/repositories/species.repository';
import { RelationalSpeciesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

const infrastructurePersistenceModule = RelationalSpeciesPersistenceModule;

@Module({
  imports: [
    TypeOrmModule.forFeature([SpeciesEntity]),
    infrastructurePersistenceModule,
  ],
  controllers: [SpeciesController],
  providers: [
    {
      provide: SpeciesRepository,
      useClass: SpeciesRelationalRepository,
    },
    SpeciesService,
  ],
  exports: [SpeciesRepository, infrastructurePersistenceModule],
})
export class SpeciesModule {}

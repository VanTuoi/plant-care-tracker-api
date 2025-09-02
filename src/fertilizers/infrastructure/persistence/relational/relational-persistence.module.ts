import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FertilizerRepository } from '../fertilizers.repository';
import { FertilizersRelationalRepository } from './repositories/fertilizers.repository';
import { FertilizerEntity } from './entities/fertilizers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FertilizerEntity])],
  providers: [
    {
      provide: FertilizerRepository,
      useClass: FertilizersRelationalRepository,
    },
  ],
  exports: [FertilizerRepository],
})
export class RelationalFertilizerPersistenceModule {}

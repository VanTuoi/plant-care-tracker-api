import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowthDiaryRepository } from '../growth-diary.repository';
import { GrowthDiaryRelationalRepository } from './repositories/growth-diary.repository';
import { GrowthDiaryEntity } from './entities/growth-diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrowthDiaryEntity])],
  providers: [
    {
      provide: GrowthDiaryRepository,
      useClass: GrowthDiaryRelationalRepository,
    },
  ],
  exports: [GrowthDiaryRepository],
})
export class RelationalGrowthDiaryPersistenceModule {}

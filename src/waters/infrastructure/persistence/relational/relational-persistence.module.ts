import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterEntity } from './entities/water.entity';
import { WaterRepository } from './water.repository';
import { WatersRelationalRepository } from './repositories/water.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WaterEntity])],
  providers: [
    {
      provide: WaterRepository,
      useClass: WatersRelationalRepository,
    },
  ],
  exports: [WaterRepository],
})
export class RelationalWaterPersistenceModule {}

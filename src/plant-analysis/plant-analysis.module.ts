import { Module } from '@nestjs/common';
import { PlantAnalysisController } from './plant-analysis.controller';
import { PlantAnalysisService } from './plant-analysis.service';
import { PlantAnalysisApi } from './infrastructure/external/plant-analysis.api';

const controllers =
  process.env.NODE_ENV === 'development' ? [PlantAnalysisController] : [];

@Module({
  controllers,
  providers: [PlantAnalysisService, PlantAnalysisApi],
})
export class PlantAnalysisModule {}

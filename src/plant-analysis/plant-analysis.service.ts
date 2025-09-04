import { Injectable } from '@nestjs/common';
import { PlantAnalysisApi } from './infrastructure/external/plant-analysis.api';
import { PlantAnalysis } from './domain/plant-analysis';

@Injectable()
export class PlantAnalysisService {
  constructor(private readonly plantAnalysisApi: PlantAnalysisApi) {}

  async identify(file: Express.Multer.File): Promise<PlantAnalysis[]> {
    return this.plantAnalysisApi.identify(file);
  }
}

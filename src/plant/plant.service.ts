import { Injectable } from '@nestjs/common';
import { PlantAiApi } from './infrastructure/external/plant-ai.api';
import { Plant } from './domain/plant';

@Injectable()
export class PlantService {
  constructor(private readonly plantApi: PlantAiApi) {}

  async identify(file: Express.Multer.File): Promise<Plant[]> {
    return this.plantApi.identify(file);
  }
}

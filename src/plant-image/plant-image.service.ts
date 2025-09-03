import {
  Injectable,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { PlantImageRepository } from './infrastructure/persistence/plant-image.repository';
import { PlantImage } from './domain/plant-image';
import { FilesService } from '../files/files.service';
import { PlantsService } from '../plants/plants.service';
import { JwtPayloadType } from '../common/types/jwt-payload.type';

@Injectable()
export class PlantImageService {
  constructor(
    private readonly plantImageRepository: PlantImageRepository,
    private readonly plantsService: PlantsService,
    private readonly filesService: FilesService,
  ) {}

  findAllByPlantId(plantId: PlantImage['plantId']): Promise<PlantImage[]> {
    return this.plantImageRepository.findAllByPlantId(plantId);
  }

  async create(
    data: Omit<PlantImage, 'id' | 'createdAt' | 'deletedAt'>,
    jwt: JwtPayloadType,
  ): Promise<PlantImage> {
    const plant = await this.plantsService.findById(data.plantId, jwt);
    if (!plant) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });
    }

    const file = await this.filesService.findById(data.fileId);
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { file: 'fileNotExists' },
      });
    }

    return this.plantImageRepository.create(data);
  }

  deleteById(id: PlantImage['id']): Promise<void> {
    return this.plantImageRepository.deleteById(id);
  }
}

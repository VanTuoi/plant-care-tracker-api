import {
  Injectable,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { GrowthDiaryRepository } from './infrastructure/persistence/growth-diary.repository';
import { GrowthDiary } from './domain/growth-diary';
import { FilesService } from '../files/files.service';
import { PlantsService } from '../plants/plants.service';
import { JwtPayloadType } from '../common/types/jwt-payload.type';

@Injectable()
export class GrowthDiariesService {
  constructor(
    private readonly growthDiaryRepository: GrowthDiaryRepository,
    private readonly plantsService: PlantsService,
    private readonly filesService: FilesService,
  ) {}

  findAllByPlantId(plantId: GrowthDiary['plantId']): Promise<GrowthDiary[]> {
    return this.growthDiaryRepository.findAllByPlantId(plantId);
  }

  getAll(): Promise<GrowthDiary[]> {
    return this.growthDiaryRepository.getAll();
  }

  getById(id: GrowthDiary['id']): Promise<GrowthDiary | null> {
    return this.growthDiaryRepository.getById(id);
  }

  async create(
    data: Omit<GrowthDiary, 'id' | 'createdAt' | 'deletedAt'>,
    jwt: JwtPayloadType,
  ): Promise<GrowthDiary> {
    const plant = await this.plantsService.findById(data.plantId, jwt);
    if (!plant) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });
    }

    if (data.file) {
      const file = await this.filesService.findById(data.file.id);
      if (!file) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { file: 'fileNotExists' },
        });
      }

      const existingDiaryWithFile =
        await this.growthDiaryRepository.findByFileId(data.file.id);
      if (existingDiaryWithFile) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { file: 'fileAlreadyUsed' },
        });
      }
    }

    return this.growthDiaryRepository.create(data);
  }

  deleteById(id: GrowthDiary['id']): Promise<void> {
    return this.growthDiaryRepository.deleteById(id);
  }
}

import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Fertilizer } from './domain/fertilizers';
import { CreateFertilizerDto } from './dto/create-fertilizers.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizers.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FertilizerRepository } from './infrastructure/persistence/fertilizers.repository';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { RoleEnum } from '../roles/roles.enum';
import { PlantRepository } from '../plants/infrastructure/persistence/plants.repository';

@Injectable()
export class FertilizersService {
  constructor(
    private readonly fertilizerRepository: FertilizerRepository,
    private readonly plantRepository: PlantRepository,
  ) {}

  async create(
    dto: CreateFertilizerDto,
    jwt: JwtPayloadType,
  ): Promise<Fertilizer> {
    const plant = await this.plantRepository.findById(dto.plantId);
    if (!plant) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });
    }

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotCreateFertilizerForPlantOfAnotherUser' },
      });
    }

    return this.fertilizerRepository.create(dto);
  }

  async findAll(jwt: JwtPayloadType): Promise<Fertilizer[]> {
    if (jwt.role?.id === RoleEnum.admin) {
      return this.fertilizerRepository.findAll();
    }

    const plants = await this.plantRepository.findByUserId(jwt.id);
    const plantIds = plants.map((p) => p.id);

    return this.fertilizerRepository.findByPlantIds(plantIds);
  }

  async findById(
    id: Fertilizer['id'],
    jwt: JwtPayloadType,
  ): Promise<NullableType<Fertilizer>> {
    const fertilizer = await this.fertilizerRepository.findById(id);
    if (!fertilizer) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { fertilizer: 'fertilizerNotExists' },
      });
    }

    const plant = await this.plantRepository.findById(fertilizer.plantId);
    if (!plant)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotFindFertilizerOfAnotherUser' },
      });
    }

    return fertilizer;
  }

  async update(
    id: Fertilizer['id'],
    dto: UpdateFertilizerDto,
    jwt: JwtPayloadType,
  ): Promise<Fertilizer | null> {
    const fertilizer = await this.fertilizerRepository.findById(id);
    if (!fertilizer) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { fertilizer: 'fertilizerNotExists' },
      });
    }

    const plant = await this.plantRepository.findById(fertilizer.plantId);
    if (!plant)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotUpdateFertilizerOfAnotherUser' },
      });
    }

    return this.fertilizerRepository.update(id, dto);
  }
}

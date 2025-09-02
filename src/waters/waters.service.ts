import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Water } from './domain/water';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import { NullableType } from '../utils/types/nullable.type';
import { WaterRepository } from './infrastructure/persistence/relational/water.repository';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { RoleEnum } from '../roles/roles.enum';
import { PlantRepository } from '../plants/infrastructure/persistence/plants.repository';

@Injectable()
export class WatersService {
  constructor(
    private readonly waterRepository: WaterRepository,
    private readonly plantRepository: PlantRepository,
  ) {}

  async create(dto: CreateWaterDto, jwt: JwtPayloadType): Promise<Water> {
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
        errors: { user: 'cannotCreateWaterForPlantOfAnotherUser' },
      });
    }

    return this.waterRepository.create(dto);
  }

  async findAll(jwt: JwtPayloadType): Promise<Water[]> {
    if (jwt.role?.id === RoleEnum.admin) {
      return this.waterRepository.findAll();
    }

    const plants = await this.plantRepository.findByUserId(jwt.id);
    const plantIds = plants.map((p) => p.id);

    return this.waterRepository.findByPlantIds(plantIds);
  }

  async findById(
    id: Water['id'],
    jwt: JwtPayloadType,
  ): Promise<NullableType<Water>> {
    const water = await this.waterRepository.findById(id);
    if (!water) return null;

    const plant = await this.plantRepository.findById(water.plantId);
    if (!plant) return null;

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotFindWaterOfAnotherUser' },
      });
    }

    return water;
  }

  async update(
    id: Water['id'],
    dto: UpdateWaterDto,
    jwt: JwtPayloadType,
  ): Promise<Water | null> {
    const water = await this.waterRepository.findById(id);
    if (!water)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { water: 'waterNotExists' },
      });

    const plant = await this.plantRepository.findById(water.plantId);
    if (!plant) return null;

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotUpdateWaterOfAnotherUser' },
      });
    }

    return this.waterRepository.update(id, dto);
  }
}

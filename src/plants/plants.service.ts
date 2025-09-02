import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Plant } from './domain/plant';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterPlantDto, SortPlantDto } from './dto/query-plant.dto';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { UsersService } from '../users/users.service';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { RoleEnum } from '../roles/roles.enum';
import { SpeciesRepository } from '../species/infrastructure/persistence/species.repository';
import { SpeciesMapper } from '../species/infrastructure/persistence/relational/mappers/species.mapper';
import { PlantRepository } from './infrastructure/persistence/plants.repository';

@Injectable()
export class PlantsService {
  constructor(
    private readonly plantsRepository: PlantRepository,
    private readonly speciesRepository: SpeciesRepository,
    private readonly userService: UsersService,
  ) {}

  async create(
    createPlantDto: CreatePlantDto,
    jwt: JwtPayloadType,
  ): Promise<Plant> {
    const userId =
      jwt.role?.id === RoleEnum.admin && createPlantDto.userId
        ? createPlantDto.userId
        : jwt.id;

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'userNotExists' },
      });
    }

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== user.id) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotCreatePlantForAnotherUser' },
      });
    }

    let plantData: Omit<Plant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> =
      {
        ...createPlantDto,
        userId: user.id,
      };

    if (createPlantDto.speciesId) {
      const species = await this.speciesRepository.findById(
        createPlantDto.speciesId,
      );
      if (!species) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { species: 'speciesNotExists' },
        });
      }
      plantData = {
        ...SpeciesMapper.toSpeciesBase(species),
        ...createPlantDto,
        userId: user.id,
      };
    }

    return this.plantsRepository.create(plantData);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    jwt,
  }: {
    filterOptions?: FilterPlantDto | null;
    sortOptions?: SortPlantDto[] | null;
    paginationOptions: IPaginationOptions;
    jwt: JwtPayloadType;
  }): Promise<Plant[]> {
    if (jwt.role?.id !== RoleEnum.admin) {
      filterOptions = { ...filterOptions, userId: jwt.id };
    }

    return this.plantsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async findById(
    id: Plant['id'],
    jwt: JwtPayloadType,
  ): Promise<NullableType<Plant>> {
    const plant = await this.plantsRepository.findById(id);

    if (!plant)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotFindPlantForAnotherUser' },
      });
    }

    return plant;
  }

  findByIds(ids: Plant['id'][]): Promise<Plant[]> {
    return this.plantsRepository.findByIds(ids);
  }

  async update(
    id: Plant['id'],
    updatePlantDto: UpdatePlantDto,
    jwt: JwtPayloadType,
  ): Promise<Plant | null> {
    const plant = await this.plantsRepository.findById(id);

    if (!plant)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotUpdatePlantOfAnotherUser' },
      });
    }

    return this.plantsRepository.update(id, {
      ...updatePlantDto,
      userId: plant.userId,
    });
  }

  async remove(id: Plant['id'], jwt: JwtPayloadType): Promise<void> {
    const plant = await this.plantsRepository.findById(id);
    if (!plant)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { plant: 'plantNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== plant.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotDeletePlantOfAnotherUser' },
      });
    }

    await this.plantsRepository.remove(id);
  }
}

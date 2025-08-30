import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SiteRepository } from './infrastructure/persistence/site.repository';
import { Site } from './domain/site';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterSiteDto, SortSiteDto } from './dto/query-site.dto';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { UsersService } from '../users/users.service';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { RoleEnum } from '../roles/roles.enum';

@Injectable()
export class SitesService {
  constructor(
    private readonly sitesRepository: SiteRepository,
    private readonly userService: UsersService,
  ) {}

  async create(
    createSiteDto: CreateSiteDto,
    jwt: JwtPayloadType,
  ): Promise<Site> {
    const user = await this.userService.findById(createSiteDto.userId);
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userNotExists',
        },
      });
    }

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== user.id) {
      throw new UnprocessableEntityException({
        status: HttpStatus.FORBIDDEN,
        errors: {
          user: 'cannotCreateSiteForAnotherUser',
        },
      });
    }

    return this.sitesRepository.create({
      ...createSiteDto,
      userId: user.id,
    });
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    jwt,
  }: {
    filterOptions?: FilterSiteDto | null;
    sortOptions?: SortSiteDto[] | null;
    paginationOptions: IPaginationOptions;
    jwt: JwtPayloadType;
  }): Promise<Site[]> {
    if (jwt.role?.id !== RoleEnum.admin) {
      filterOptions = {
        ...filterOptions,
        userId: jwt.id,
      };
    }

    return this.sitesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async findById(
    id: Site['id'],
    jwt: JwtPayloadType,
  ): Promise<NullableType<Site>> {
    const site = await this.sitesRepository.findById(id);
    if (!site) return null;

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== site.userId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.FORBIDDEN,
        errors: {
          user: 'cannotFindSiteForAnotherUser',
        },
      });
    }

    return site;
  }

  findByIds(ids: Site['id'][]): Promise<Site[]> {
    return this.sitesRepository.findByIds(ids);
  }

  async update(
    id: Site['id'],
    updateSiteDto: UpdateSiteDto,
    jwt: JwtPayloadType,
  ): Promise<Site | null> {
    const site = await this.sitesRepository.findById(id);
    if (!site) return null;

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== site.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: {
          user: 'cannotUpdateSiteOfAnotherUser',
        },
      });
    }

    return this.sitesRepository.update(id, {
      ...updateSiteDto,
      userId: site.userId,
    });
  }

  async remove(id: Site['id'], jwt: JwtPayloadType): Promise<void> {
    const site = await this.sitesRepository.findById(id);
    if (!site) return;

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== site.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: {
          user: 'cannotDeleteSiteOfAnotherUser',
        },
      });
    }

    await this.sitesRepository.remove(id);
  }
}

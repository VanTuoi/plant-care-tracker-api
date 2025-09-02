import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

import { PlantsService } from './plants.service';
import { Plant } from './domain/plant';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { QueryPlantDto } from './dto/query-plant.dto';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { PlantDto } from './dto/plant.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Plants')
@Controller({
  path: 'plants',
  version: '1',
})
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @ApiCreatedResponse({
    type: Plant,
  })
  @SerializeOptions({ groups: ['admin'] })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePlantDto, @Req() req): Promise<Plant> {
    return this.plantsService.create(dto, req.user as JwtPayloadType);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Plant),
  })
  @SerializeOptions({ groups: ['admin'] })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query()
    query: QueryPlantDto,
    @Req() req,
  ): Promise<InfinityPaginationResponseDto<Plant>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    const plants = await this.plantsService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: { page, limit },
      jwt: req.user as JwtPayloadType,
    });

    return infinityPagination(plants, { page, limit });
  }

  @ApiOkResponse({ type: Plant })
  @SerializeOptions({ groups: ['admin'] })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: PlantDto, @Req() req) {
    return this.plantsService.findById(params.id, req.user as JwtPayloadType);
  }

  @ApiOkResponse({ type: Plant })
  @SerializeOptions({ groups: ['admin'] })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() params: PlantDto,
    @Body() dto: UpdatePlantDto,
    @Req() req,
  ): Promise<Plant | null> {
    return this.plantsService.update(
      params.id,
      dto,
      req.user as JwtPayloadType,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: PlantDto, @Req() req): Promise<void> {
    return this.plantsService.remove(params.id, req.user as JwtPayloadType);
  }
}

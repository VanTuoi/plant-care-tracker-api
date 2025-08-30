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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

import { SitesService } from './sites.service';
import { Site } from './domain/site';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { QuerySiteDto } from './dto/query-site.dto';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { JwtPayloadType } from '../common/types/jwt-payload.type';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Sites')
@Controller({
  path: 'sites',
  version: '1',
})
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @ApiCreatedResponse({
    type: Site,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSiteDto, @Req() req): Promise<Site> {
    return this.sitesService.create(dto, req.user as JwtPayloadType);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Site),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QuerySiteDto,
    @Req() req,
  ): Promise<InfinityPaginationResponseDto<Site>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.sitesService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
        jwt: req.user as JwtPayloadType,
      }),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: Site,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Site['id'], @Req() req) {
    return this.sitesService.findById(id, req.user as JwtPayloadType);
  }

  @ApiOkResponse({
    type: Site,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Site['id'],
    @Body() updateSiteDto: UpdateSiteDto,
    @Req() req,
  ): Promise<Site | null> {
    return this.sitesService.update(
      id,
      updateSiteDto,
      req.user as JwtPayloadType,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Site['id'], @Req() req): Promise<void> {
    return this.sitesService.remove(id, req.user as JwtPayloadType);
  }
}

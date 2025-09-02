// fertilizers.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

import { NullableType } from '../utils/types/nullable.type';
import { FertilizersService } from './fertilizers.service';
import { CreateFertilizerDto } from './dto/create-fertilizers.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizers.dto';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { Fertilizer } from './domain/fertilizers';
import { FertilizerDto } from './dto/fertilizers.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Fertilizers')
@Controller({
  path: 'fertilizers',
  version: '1',
})
export class FertilizersController {
  constructor(private readonly fertilizersService: FertilizersService) {}

  @ApiCreatedResponse({
    type: Fertilizer,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createFertilizerDto: CreateFertilizerDto,
    @Req() req,
  ): Promise<Fertilizer> {
    return this.fertilizersService.create(
      createFertilizerDto,
      req.user as JwtPayloadType,
    );
  }

  @ApiOkResponse({
    type: [Fertilizer],
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req): Promise<Fertilizer[]> {
    return this.fertilizersService.findAll(req.user as JwtPayloadType);
  }

  @ApiOkResponse({
    type: Fertilizer,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @ApiOkResponse({ type: Fertilizer })
  @SerializeOptions({ groups: ['admin'] })
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param() params: FertilizerDto,
    @Req() req,
  ): Promise<NullableType<Fertilizer>> {
    return this.fertilizersService.findById(
      params.id,
      req.user as JwtPayloadType,
    );
  }

  @ApiOkResponse({
    type: Fertilizer,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @ApiOkResponse({ type: Fertilizer })
  @SerializeOptions({ groups: ['admin'] })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateFertilizerDto })
  update(
    @Param() params: FertilizerDto,
    @Body() updateFertilizerDto: UpdateFertilizerDto,
    @Req() req,
  ): Promise<Fertilizer | null> {
    return this.fertilizersService.update(
      params.id,
      updateFertilizerDto,
      req.user as JwtPayloadType,
    );
  }
}

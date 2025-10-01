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
import { Water } from './domain/water';
import { WatersService } from './waters.service';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { WaterDto } from './dto/water.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Waters')
@Controller({
  path: 'waters',
  version: '1',
})
export class WatersController {
  constructor(private readonly watersService: WatersService) {}

  @ApiCreatedResponse({
    type: Water,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWaterDto: CreateWaterDto, @Req() req): Promise<Water> {
    return this.watersService.create(
      createWaterDto,
      req.user as JwtPayloadType,
    );
  }

  @ApiOkResponse({
    type: [Water],
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req): Promise<Water[]> {
    return this.watersService.findAll(req.user as JwtPayloadType);
  }

  @ApiOkResponse({
    type: Water,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: WaterDto, @Req() req): Promise<NullableType<Water>> {
    return this.watersService.findById(params.id, req.user as JwtPayloadType);
  }

  @ApiOkResponse({
    type: Water,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateWaterDto })
  update(
    @Param() params: WaterDto,
    @Body() updateWaterDto: UpdateWaterDto,
    @Req() req,
  ): Promise<Water | null> {
    return this.watersService.update(
      params.id,
      updateWaterDto,
      req.user as JwtPayloadType,
    );
  }
}

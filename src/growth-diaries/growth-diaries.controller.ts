import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GrowthDiariesService } from './growth-diaries.service';
import { CreateGrowthDiaryDto } from './dto/create-growth-diary.dto';
import { GrowthDiary } from './domain/growth-diary';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { GrowthDiaryIdDto } from './dto/growth-diary.dto';

@ApiTags('Growth Diaries')
@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'growth-diaries', version: '1' })
export class GrowthDiariesController {
  constructor(private readonly growthDiaryService: GrowthDiariesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Tạo ghi chép thành công' })
  async create(
    @Body() dto: CreateGrowthDiaryDto,
    @Req() req,
  ): Promise<Partial<GrowthDiary>> {
    return await this.growthDiaryService.create(
      dto,
      req.user as JwtPayloadType,
    );
  }

  @Get()
  @ApiCreatedResponse({ description: 'Lấy tất cả ghi chép' })
  async getAll(): Promise<GrowthDiary[]> {
    return this.growthDiaryService.getAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ description: 'Lấy ghi chép theo ID' })
  async getById(@Param() dto: GrowthDiaryIdDto): Promise<GrowthDiary | null> {
    return this.growthDiaryService.getById(dto.id);
  }

  @Delete(':id')
  async deleteById(@Param() dto: GrowthDiaryIdDto) {
    return this.growthDiaryService.deleteById(dto.id);
  }
}

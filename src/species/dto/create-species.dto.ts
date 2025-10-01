import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsEnum,
} from 'class-validator';

import { DifficultyLevelEnum, SunlightNeedEnum } from '../species.enum';
import { WaterEnum } from '../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../fertilizers/fertilizers.enum';
export class CreateSpeciesDto {
  @ApiProperty({ description: 'Tên thông thường của loài', example: 'Lưỡi Hổ' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tên khoa học của loài',
    example: 'Sansevieria trifasciata',
  })
  @IsString()
  scientificName: string;

  @ApiPropertyOptional({ description: 'ID ảnh đại diện', example: 'uuid' })
  @IsOptional()
  @IsUUID()
  imageId?: string;

  @ApiPropertyOptional({ description: 'Tần suất tưới (lần/tuần)', example: 2 })
  @IsOptional()
  @IsNumber()
  wateringFrequency?: number;

  @ApiPropertyOptional({ description: 'Lượng nước tưới (ml)', example: 200 })
  @IsOptional()
  @IsNumber()
  wateringAmount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp tưới',
    enum: WaterEnum,
    example: WaterEnum.ROOT,
  })
  @IsOptional()
  @IsEnum(WaterEnum)
  wateringMethod?: WaterEnum;

  @ApiPropertyOptional({
    description: 'Tần suất bón phân (lần/tháng)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  fertilizingFrequency?: number;

  @ApiPropertyOptional({ description: 'Lượng phân bón (g)', example: 50 })
  @IsOptional()
  @IsNumber()
  fertilizingAmount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp bón phân',
    enum: FertilizerMethodEnum,
    example: FertilizerMethodEnum.SOIL_MIXING,
  })
  @IsOptional()
  @IsEnum(FertilizerMethodEnum)
  fertilizingMethod?: FertilizerMethodEnum;

  @ApiPropertyOptional({
    description: 'Loại phân bón',
    enum: FertilizerTypeEnum,
    example: FertilizerTypeEnum.ORGANIC,
  })
  @IsOptional()
  @IsEnum(FertilizerTypeEnum)
  fertilizerType?: FertilizerTypeEnum;

  @ApiPropertyOptional({
    description: 'Nhu cầu ánh sáng',
    enum: SunlightNeedEnum,
    example: SunlightNeedEnum.FULL_SUN,
  })
  @IsOptional()
  @IsEnum(SunlightNeedEnum)
  sunlightNeed?: SunlightNeedEnum;

  @ApiPropertyOptional({
    description: 'Mức độ khó chăm sóc',
    enum: DifficultyLevelEnum,
    example: DifficultyLevelEnum.EASY,
  })
  @IsOptional()
  @IsEnum(DifficultyLevelEnum)
  difficultyLevel?: DifficultyLevelEnum;
}

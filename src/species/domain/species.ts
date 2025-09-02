import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsEnum,
  IsDate,
} from 'class-validator';
import { WaterEnum } from '../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../fertilizers/fertilizers.enum';
import { DifficultyLevelEnum, SunlightNeedEnum } from '../species.enum';
export class Species {
  @ApiProperty({ description: 'ID duy nhất của loài cây', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Tên thông thường của loài', example: 'Lưỡi Hổ' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tên khoa học của loài',
    example: 'Sansevieria trifasciata',
  })
  @IsString()
  scientificName: string;

  @ApiPropertyOptional({
    description: 'ID ảnh đại diện',
    example: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;

  @ApiPropertyOptional({
    description: 'Tần suất tưới (lần/tuần)',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  wateringFrequency?: number;

  @ApiPropertyOptional({
    description: 'Lượng nước tưới (ml)',
    example: 200,
  })
  @IsOptional()
  @IsNumber()
  wateringAmount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp tưới',
    enum: WaterEnum,
    example: WaterEnum.ROOT,
  })
  @IsEnum(WaterEnum)
  @IsOptional()
  wateringMethod?: WaterEnum;

  @ApiPropertyOptional({
    description: 'Tần suất bón phân (lần/tháng)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  fertilizingFrequency?: number;

  @ApiPropertyOptional({
    description: 'Lượng phân bón (g)',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  fertilizingAmount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp bón phân',
    enum: FertilizerMethodEnum,
    example: FertilizerMethodEnum.SOIL_MIXING,
  })
  @IsEnum(FertilizerMethodEnum)
  @IsOptional()
  fertilizingMethod?: FertilizerMethodEnum;

  @ApiPropertyOptional({
    description: 'Loại phân bón',
    enum: FertilizerTypeEnum,
    example: FertilizerTypeEnum.ORGANIC,
  })
  @IsEnum(FertilizerTypeEnum)
  @IsOptional()
  fertilizerType?: FertilizerTypeEnum;

  @ApiPropertyOptional({
    description: 'Nhu cầu ánh sáng',
    enum: SunlightNeedEnum,
    example: SunlightNeedEnum.FULL_SUN,
  })
  @IsEnum(SunlightNeedEnum)
  @IsOptional()
  sunlightNeed?: SunlightNeedEnum;

  @ApiPropertyOptional({
    description: 'Mức độ khó chăm sóc',
    enum: DifficultyLevelEnum,
    example: DifficultyLevelEnum.MODERATE,
  })
  @IsEnum(DifficultyLevelEnum)
  @IsOptional()
  difficultyLevel?: DifficultyLevelEnum;

  @ApiPropertyOptional({
    description: 'Ngày tạo',
    example: '2025-08-30T12:00:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Ngày cập nhật',
    example: '2025-08-30T12:30:00Z',
  })
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Ngày xoá',
    example: '2025-08-30T12:30:00Z',
  })
  @IsDate()
  deletedAt: Date;
}

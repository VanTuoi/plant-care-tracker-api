import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { WaterEnum } from '../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../fertilizers/fertilizers.enum';
import { DifficultyLevelEnum, SunlightNeedEnum } from '../plant.enum';
import { Transform } from 'class-transformer';

export class CreatePlantDto {
  @ApiPropertyOptional({ description: 'Tên cây', example: 'Hoa Hồng Đỏ' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Tên khoa học',
    example: 'Rosa rubiginosa',
  })
  @IsOptional()
  @IsString()
  scientificName?: string;

  @ApiPropertyOptional({ description: 'Kích thước cây', example: 'medium' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({ description: 'Cây trồng trong đất', example: true })
  @IsOptional()
  @IsBoolean()
  inGround?: boolean;

  @ApiPropertyOptional({ description: 'Cây đã chết', example: false })
  @IsOptional()
  @IsBoolean()
  isDead?: boolean;

  @ApiPropertyOptional({ description: 'Tần suất tưới (số ngày)', example: 3 })
  @IsOptional()
  @IsNumber()
  wateringFrequency?: number;

  @ApiPropertyOptional({ description: 'Lượng nước tưới (ml)', example: 500 })
  @IsOptional()
  @IsNumber()
  wateringAmount?: number;

  @ApiPropertyOptional({ description: 'Phương pháp tưới', enum: WaterEnum })
  @IsOptional()
  @IsEnum(WaterEnum)
  wateringMethod?: WaterEnum;

  @ApiPropertyOptional({
    description: 'Tần suất bón phân (số ngày)',
    example: 14,
  })
  @IsOptional()
  @IsNumber()
  fertilizingFrequency?: number;

  @ApiPropertyOptional({ description: 'Lượng phân bón (gram)', example: 100 })
  @IsOptional()
  @IsNumber()
  fertilizingAmount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp bón phân',
    enum: FertilizerMethodEnum,
  })
  @IsOptional()
  @IsEnum(FertilizerMethodEnum)
  fertilizingMethod?: FertilizerMethodEnum;

  @ApiPropertyOptional({
    description: 'Loại phân bón',
    enum: FertilizerTypeEnum,
  })
  @IsOptional()
  @IsEnum(FertilizerTypeEnum)
  fertilizerType?: FertilizerTypeEnum;

  @ApiPropertyOptional({
    description: 'Nhu cầu ánh sáng',
    enum: SunlightNeedEnum,
  })
  @IsOptional()
  @IsEnum(SunlightNeedEnum)
  sunlightNeed?: SunlightNeedEnum;

  @ApiPropertyOptional({
    description: 'Mức độ khó chăm sóc',
    enum: DifficultyLevelEnum,
  })
  @IsOptional()
  @IsEnum(DifficultyLevelEnum)
  difficultyLevel?: DifficultyLevelEnum;

  @ApiPropertyOptional({ description: 'ID loài cây', example: 'uuid' })
  @IsOptional()
  @IsUUID()
  @Transform(({ value }) => value || null)
  speciesId?: string;

  @ApiPropertyOptional({ description: 'ID hình ảnh cây', example: '' })
  @IsOptional()
  @Transform(({ value }) => value || null)
  plantImageld?: string;

  @ApiPropertyOptional({ description: 'ID người dùng sở hữu', example: 'uuid' })
  @IsUUID()
  @IsOptional()
  userId: string;

  @ApiPropertyOptional({ description: 'ID khu vực (site)', example: 'uuid' })
  @IsOptional()
  @IsUUID()
  @Transform(({ value }) => value || null)
  siteId?: string;
}

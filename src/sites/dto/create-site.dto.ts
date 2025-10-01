import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  ValidateIf,
  IsEnum,
} from 'class-validator';
import {
  Sunlight,
  LightType,
  SoilType,
} from '../../template-sites/template-sites.enum';

export class CreateSiteDto {
  @ApiProperty({ description: 'Tên địa điểm', required: true })
  @ValidateIf((o) => !o.templateSiteId)
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Ánh sáng nhận được',
    enum: Sunlight,
  })
  @IsOptional()
  @IsEnum(Sunlight)
  sunlight?: Sunlight;

  @ApiPropertyOptional({
    description: 'Thời gian chiếu sáng (giờ)',
    example: 6,
  })
  @IsOptional()
  @IsNumber()
  lightDuration?: number;

  @ApiPropertyOptional({
    description: 'Loại ánh sáng',
    enum: LightType,
  })
  @IsOptional()
  @IsEnum(LightType)
  lightType?: LightType;

  @ApiPropertyOptional({
    description: 'Độ ẩm đất (%)',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  soilMoisture?: number;

  @ApiPropertyOptional({
    description: 'Loại đất',
    enum: SoilType,
  })
  @IsOptional()
  @IsEnum(SoilType)
  soilType?: SoilType;

  @ApiPropertyOptional({ description: 'pH của đất', example: 6.5 })
  @IsOptional()
  @IsNumber()
  phSoil?: number;

  @ApiPropertyOptional({ description: 'Nhiệt độ trung bình (°C)', example: 28 })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiPropertyOptional({ description: 'Độ ẩm không khí (%)', example: 65 })
  @IsOptional()
  @IsNumber()
  humidity?: number;

  @ApiPropertyOptional({ description: 'Mức độ gió (m/s)', example: 3.5 })
  @IsOptional()
  @IsNumber()
  windExposure?: number;

  @ApiPropertyOptional({ description: 'Vĩ độ', example: 10.0452 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Kinh độ', example: 105.7469 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Độ cao so với mực nước biển',
    example: 15,
  })
  @IsOptional()
  @IsNumber()
  altitude?: number;

  @ApiPropertyOptional({ description: 'ID người dùng sở hữu', example: 'uuid' })
  @IsUUID()
  @IsOptional()
  userId: string;

  @ApiPropertyOptional({ description: 'ID template site' })
  @IsOptional()
  @IsUUID()
  templateSiteId?: string;
}

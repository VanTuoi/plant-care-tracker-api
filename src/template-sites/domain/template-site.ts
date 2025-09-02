import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Sunlight, LightType, SoilType } from '../template-sites.enum';

export class TemplateSite {
  @ApiProperty({ description: 'ID duy nhất của site', example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Tên site', example: 'Ban công hướng Nam' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Mô tả site',
    example: 'Khu vực đặt cây cảnh',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Ánh sáng nhận được',
    example: Sunlight.FULL_SUN,
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
    example: LightType.NATURAL,
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
    example: SoilType.LOAMY,
    enum: SoilType,
  })
  @IsOptional()
  @IsEnum(SoilType)
  soilType?: SoilType;

  @ApiPropertyOptional({
    description: 'pH của đất',
    example: 6.5,
  })
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
    description: 'Ngày xóa (nếu đã xóa mềm)',
    example: '2025-09-01T10:00:00Z',
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;
}

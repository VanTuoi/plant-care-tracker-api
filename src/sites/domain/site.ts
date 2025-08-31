import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class Site {
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
    example: 'full_sun, partial_shade',
  })
  @IsOptional()
  @IsString()
  sunlight?: string;

  @ApiPropertyOptional({
    description: 'Thời gian chiếu sáng',
    example: '6h/day',
  })
  @IsOptional()
  @IsString()
  lightDuration?: string;

  @ApiPropertyOptional({
    description: 'Loại ánh sáng',
    example: 'tự nhiên, nhân tạo',
  })
  @IsOptional()
  @IsString()
  lightType?: string;

  @ApiPropertyOptional({ description: 'Độ ẩm đất', example: 'ẩm vừa, khô' })
  @IsOptional()
  @IsString()
  soilMoisture?: string;

  @ApiPropertyOptional({
    description: 'Loại đất',
    example: 'đất thịt, đất cát',
  })
  @IsOptional()
  @IsString()
  soilType?: string;

  @ApiPropertyOptional({ description: 'pH của đất', example: '6.5' })
  @IsOptional()
  @IsString()
  phSoil?: string;

  @ApiPropertyOptional({ description: 'Nhiệt độ trung bình (°C)', example: 28 })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiPropertyOptional({ description: 'Độ ẩm không khí (%)', example: 65 })
  @IsOptional()
  @IsNumber()
  humidity?: number;

  @ApiPropertyOptional({
    description: 'Mức độ gió',
    example: 'mạnh, yếu, trung bình',
  })
  @IsOptional()
  @IsString()
  windExposure?: string;

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

  @ApiPropertyOptional({ description: 'ID của người dùng', example: 'uuid' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Ngày tạo',
    example: '2025-08-30T12:00:00Z',
  })
  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Ngày cập nhật',
    example: '2025-08-30T12:30:00Z',
  })
  @ApiProperty()
  updatedAt: Date;
}

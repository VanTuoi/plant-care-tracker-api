import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDate,
} from 'class-validator';

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
    example: 'tưới gốc, phun sương',
  })
  @IsOptional()
  @IsString()
  wateringMethod?: string;

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
    example: 'bón gốc, phun lá',
  })
  @IsOptional()
  @IsString()
  fertilizingMethod?: string;

  @ApiPropertyOptional({
    description: 'Loại phân bón',
    example: 'NPK, hữu cơ',
  })
  @IsOptional()
  @IsString()
  fertilizerType?: string;

  @ApiPropertyOptional({
    description: 'Nhu cầu ánh sáng',
    example: 'full_sun, partial_shade',
  })
  @IsOptional()
  @IsString()
  sunlightNeed?: string;

  @ApiPropertyOptional({
    description: 'Mức độ khó chăm sóc',
    example: 'dễ, trung bình, khó',
  })
  @IsOptional()
  @IsString()
  difficultyLevel?: string;

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

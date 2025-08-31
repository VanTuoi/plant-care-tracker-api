import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  ValidateIf,
} from 'class-validator';

export class CreateSiteDto {
  @ApiProperty({ description: 'Tên địa điểm', required: true })
  @ValidateIf((o) => !o.templateSiteId)
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'Mô tả' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    description: 'Ánh sáng (direct, indirect, ...)',
  })
  @IsOptional()
  @IsString()
  sunlight?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lightDuration?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lightType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  soilMoisture?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  soilType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phSoil?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  humidity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  windExposure?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  altitude?: number;

  @ApiProperty({ description: 'ID user sở hữu site' })
  @IsUUID()
  userId: string;

  @ApiProperty({ required: false, description: 'ID template site' })
  @IsOptional()
  @IsUUID()
  templateSiteId?: string;
}

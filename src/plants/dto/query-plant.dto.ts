import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Plant } from '../domain/plant';

export class FilterPlantDto {
  @ApiPropertyOptional({ type: String, description: 'ID loài cây' })
  @IsOptional()
  @IsString()
  speciesId?: string;

  @ApiPropertyOptional({ type: String, description: 'ID khu vực (site)' })
  @IsOptional()
  @IsString()
  siteId?: string;

  @ApiPropertyOptional({ type: String, description: 'Tên khu vực (site)' })
  @IsOptional()
  @IsString()
  siteName?: string;

  @ApiPropertyOptional({ type: String, description: 'ID người dùng sở hữu' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ type: String, description: 'Tên cây' })
  @IsOptional()
  @IsString()
  name?: string;
}

export class SortPlantDto {
  @ApiProperty({ description: 'Tên cột để sắp xếp' })
  @IsString()
  orderBy: keyof Plant;

  @ApiProperty({ description: 'asc | desc' })
  @IsString()
  order: 'asc' | 'desc';
}

export class QueryPlantDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterPlantDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterPlantDto)
  filters?: FilterPlantDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(SortPlantDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortPlantDto)
  sort?: SortPlantDto[] | null;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Species } from '../domain/species';

export class FilterSpeciesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  scientificName?: string;
}

export class SortSpeciesDto {
  @ApiPropertyOptional()
  @IsString()
  orderBy: keyof Species;

  @ApiPropertyOptional({ example: 'ASC' })
  @IsString()
  order: 'ASC' | 'DESC';
}

export class QuerySpeciesDto {
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
    value ? plainToInstance(FilterSpeciesDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterSpeciesDto)
  filters?: FilterSpeciesDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(SortSpeciesDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortSpeciesDto)
  sort?: SortSpeciesDto[] | null;
}

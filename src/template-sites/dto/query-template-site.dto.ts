import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { TemplateSite } from '../domain/template-site';
import { Sunlight, LightType, SoilType } from '../template-sites.enum';

export class FilterTemplateSiteDto {
  @ApiPropertyOptional({ description: 'Tên site' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Mô tả site' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Ánh sáng', enum: Sunlight })
  @IsOptional()
  @IsEnum(Sunlight)
  sunlight?: Sunlight;

  @ApiPropertyOptional({ description: 'Loại ánh sáng', enum: LightType })
  @IsOptional()
  @IsEnum(LightType)
  lightType?: LightType;

  @ApiPropertyOptional({ description: 'Loại đất', enum: SoilType })
  @IsOptional()
  @IsEnum(SoilType)
  soilType?: SoilType;
}

export class SortTemplateSiteDto {
  @ApiPropertyOptional({ description: 'Tên trường muốn sắp xếp' })
  @IsString()
  orderBy: keyof TemplateSite;

  @ApiPropertyOptional({ example: 'ASC' })
  @IsString()
  order: 'ASC' | 'DESC';
}

export class QueryTemplateSiteDto {
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
    value
      ? plainToInstance(FilterTemplateSiteDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterTemplateSiteDto)
  filters?: FilterTemplateSiteDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(SortTemplateSiteDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortTemplateSiteDto)
  sort?: SortTemplateSiteDto[] | null;
}

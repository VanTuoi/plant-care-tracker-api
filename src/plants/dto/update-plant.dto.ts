import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './create-plant.dto';
import { Transform } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePlantDto extends PartialType(
  OmitType(CreatePlantDto, ['userId', 'speciesId'] as const),
) {
  @ApiPropertyOptional({ description: 'ID khu vực (site)', example: 'uuid' })
  @IsUUID()
  @Transform(({ value }) => value || null)
  siteId?: string;
}

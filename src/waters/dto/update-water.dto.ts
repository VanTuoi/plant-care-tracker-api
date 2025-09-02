import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateWaterDto } from './create-water.dto';

export class UpdateWaterDto extends PartialType(
  OmitType(CreateWaterDto, ['plantId'] as const),
) {}

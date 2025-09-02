import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateFertilizerDto } from './create-fertilizers.dto';

export class UpdateFertilizerDto extends PartialType(
  OmitType(CreateFertilizerDto, ['plantId'] as const),
) {}

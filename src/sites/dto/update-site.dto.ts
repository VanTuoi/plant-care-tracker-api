import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateSiteDto } from './create-site.dto';

export class UpdateSiteDto extends PartialType(
  OmitType(CreateSiteDto, ['userId', 'templateSiteId'] as const),
) {}

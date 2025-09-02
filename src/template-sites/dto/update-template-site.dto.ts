import { PartialType } from '@nestjs/swagger';
import { CreateTemplateSiteDto } from './create-template-site.dto';

export class UpdateTemplateSiteDto extends PartialType(CreateTemplateSiteDto) {}

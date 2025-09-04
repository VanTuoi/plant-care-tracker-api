import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateReminderOptionDto } from './create-reminder-option.dto';

export class UpdateReminderOptionDto extends PartialType(
  OmitType(CreateReminderOptionDto, ['userId'] as const),
) {}

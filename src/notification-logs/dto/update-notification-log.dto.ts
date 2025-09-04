import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateNotificationLogDto } from './create-notification-log.dto';

export class UpdateNotificationLogDto extends PartialType(
  OmitType(CreateNotificationLogDto, ['notificationId'] as const),
) {}

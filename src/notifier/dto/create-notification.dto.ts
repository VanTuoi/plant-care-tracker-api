import {
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationPriority } from '../constants/notifier.constants';

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsEmail()
  @IsOptional()
  email: string | null;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsObject()
  @IsOptional()
  payload?: Record<string, any> | null;

  @IsOptional()
  @IsEnum(NotificationPriority)
  priority?: NotificationPriority = NotificationPriority.NORMAL;
}

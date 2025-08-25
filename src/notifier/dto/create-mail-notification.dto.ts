import {
  IsString,
  IsOptional,
  IsEmail,
  IsObject,
  IsEnum,
  IsArray,
} from 'class-validator';
import { NotificationPriority } from '../constants/notifier.constants';

export class MailNotificationDto {
  @IsEmail()
  to: string;

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  cc?: string[];

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  bcc?: string[];

  @IsOptional()
  @IsEmail()
  replyTo?: string;

  @IsOptional()
  @IsString()
  subject: string | undefined;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  html?: string;

  @IsOptional()
  @IsString()
  templateKey?: string;

  @IsOptional()
  @IsString()
  templatePath?: string;

  @IsOptional()
  @IsObject()
  context?: Record<string, any>;

  @IsOptional()
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: any;
    cid?: string;
  }>;

  @IsOptional()
  @IsEnum(NotificationPriority)
  priority?: NotificationPriority = NotificationPriority.NORMAL;
}

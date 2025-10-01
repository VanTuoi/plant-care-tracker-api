import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsArray,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { Channel, ReminderPriority, SendMode } from '../reminder-options.enum';

export class ReminderOption {
  @ApiProperty({ example: 'a3f74f8e-3f1b-4f88-9a74-ef6b05c12d11' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isEnabled: boolean;

  @ApiProperty({ enum: SendMode, example: SendMode.FIXED_TIME })
  @IsEnum(SendMode)
  sendMode: SendMode;

  @ApiPropertyOptional({
    type: String,
    example: '1970-01-01T07:00:00Z',
    description: 'Giờ bắt đầu (UTC, ISO string, chỉ lấy phần giờ phút)',
  })
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiPropertyOptional({
    type: String,
    example: '1970-01-01T09:00:00Z',
    description: 'Giờ kết thúc (UTC, ISO string, chỉ lấy phần giờ phút)',
  })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiProperty({ enum: ReminderPriority, example: ReminderPriority.MEDIUM })
  @IsEnum(ReminderPriority)
  priority: ReminderPriority;

  @ApiProperty({
    type: [String],
    enum: Channel,
    example: [Channel.EMAIL, Channel.SOCKET],
  })
  @IsArray()
  @IsEnum(Channel, { each: true })
  channels: Channel[];

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty({ example: 'uuid-user-id' })
  @IsUUID()
  userId: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsArray,
  IsUUID,
  Matches,
} from 'class-validator';
import { Channel, ReminderPriority, SendMode } from '../reminder-options.enum';

export class CreateReminderOptionDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isEnabled: boolean;

  @ApiProperty({ enum: SendMode, example: SendMode.FIXED_TIME })
  @IsEnum(SendMode)
  sendMode: SendMode;

  @ApiPropertyOptional({
    type: String,
    example: '07:00:00',
    description: 'Giờ bắt đầu trong ngày (HH:mm:ss, 24h)',
  })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'startTime must be a valid time string (HH:mm:ss)',
  })
  startTime?: string;

  @ApiPropertyOptional({
    type: String,
    example: '09:00:00',
    description: 'Giờ kết thúc trong ngày (HH:mm:ss, 24h)',
  })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'endTime must be a valid time string (HH:mm:ss)',
  })
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

  @ApiProperty({ example: 'uuid-user-id' })
  @IsUUID()
  userId: string;
}

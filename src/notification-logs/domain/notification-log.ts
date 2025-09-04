import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsEnum, IsDate } from 'class-validator';
import { NotificationChannelStatus } from '../notification-logs.enum';
import { Channel } from '../../reminder-options/reminder-options.enum';

export class NotificationLog {
  @ApiProperty({
    description: 'ID duy nhất cho mỗi bản ghi thông báo',
    example: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Trạng thái gửi thông báo',
    enum: NotificationChannelStatus,
    example: NotificationChannelStatus.SENT,
  })
  @IsEnum(NotificationChannelStatus)
  status: NotificationChannelStatus;

  @ApiProperty({
    description: 'Kênh gửi thông báo',
    enum: Channel,
    example: Channel.EMAIL,
  })
  @IsEnum(Channel)
  channel: Channel;

  @ApiPropertyOptional({
    description: 'Thông báo lỗi nếu gửi thất bại',
    example: 'SMTP server không phản hồi',
  })
  @IsOptional()
  @IsString()
  errorMessage?: string | null;

  @ApiProperty({
    description: 'Thời gian tạo bản ghi',
    example: '2025-09-01T08:30:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'ID của thông báo cha',
    example: 'uuid',
  })
  @IsUUID()
  notificationId: string;
}

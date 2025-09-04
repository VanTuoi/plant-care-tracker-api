import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsEnum } from 'class-validator';
import { NotificationChannelStatus } from '../notification-logs.enum';
import { Channel } from '../../reminder-options/reminder-options.enum';

export class CreateNotificationLogDto {
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
  errorMessage?: string;

  @ApiProperty({
    description: 'Trạng thái gửi thông báo',
    enum: NotificationChannelStatus,
    example: NotificationChannelStatus.SENT,
  })
  @IsEnum(NotificationChannelStatus)
  status: NotificationChannelStatus;

  @ApiProperty({
    description: 'ID của thông báo cha',
    example: 'uuid',
  })
  @IsUUID()
  notificationId: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationTypeEnum } from '../notification.enum';

export class Notification {
  @ApiProperty({
    description: 'ID duy nhất của thông báo',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Tiêu đề thông báo',
    example: 'Cây Hoa Hồng cần được tưới nước',
  })
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Loại thông báo',
    enum: NotificationTypeEnum,
    example: NotificationTypeEnum.WATERING,
  })
  @IsEnum(NotificationTypeEnum)
  type?: NotificationTypeEnum;

  @ApiPropertyOptional({
    description: 'Payload chứa dữ liệu thêm của thông báo (JSON string)',
    example: '{"amount":500,"unit":"ml"}',
  })
  @IsString()
  @IsOptional()
  payload?: string;

  @ApiPropertyOptional({
    description: 'Đường dẫn chi tiết (URL) khi bấm vào thông báo',
    example: '/plants/a1b2c3d4/diary',
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Trạng thái đã đọc hay chưa',
    example: false,
    default: false,
  })
  @IsBoolean()
  isRead: boolean = false;

  @ApiProperty({
    description: 'Ngày tạo thông báo',
    example: '2025-09-03T12:00:00Z',
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Ngày cập nhật thông báo',
    example: '2025-09-03T15:00:00Z',
  })
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: 'ID người dùng nhận thông báo',
    example: 'user-uuid-1234',
  })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({
    description: 'ID cây liên quan (nếu có)',
    example: 'plant-uuid-5678',
  })
  @IsUUID()
  @IsOptional()
  plantId?: string;
}

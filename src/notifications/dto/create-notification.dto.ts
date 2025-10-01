import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { NotificationTypeEnum } from '../notification.enum';

export class CreateNotificationDto {
  @ApiPropertyOptional({
    description: 'Tiêu đề thông báo',
    example: 'Cây Hoa Hồng cần được tưới nước',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Loại thông báo',
    enum: NotificationTypeEnum,
    example: NotificationTypeEnum.WATERING,
  })
  @IsOptional()
  @IsEnum(NotificationTypeEnum)
  type?: NotificationTypeEnum;

  @ApiPropertyOptional({
    description: 'Payload chứa dữ liệu thêm (JSON string)',
    example: '{"amount":500,"unit":"ml"}',
  })
  @IsOptional()
  @IsString()
  payload?: string;

  @ApiPropertyOptional({
    description: 'Đường dẫn chi tiết (URL)',
    example: '/plants/a1b2c3d4/diary',
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái đã đọc hay chưa',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional({
    description: 'ID người dùng nhận thông báo',
    example: 'user-uuid-1234',
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'ID cây liên quan (nếu có)',
    example: 'plant-uuid-5678',
  })
  @IsUUID()
  @IsOptional()
  @Transform(({ value }) => value || null)
  plantId?: string;
}

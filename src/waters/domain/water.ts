import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import { WaterEnum, WaterStatusEnum } from '../waters.enum';
import { Plant } from '../../plants/domain/plant';

export class Water {
  @ApiProperty({
    description: 'ID duy nhất cho mỗi lần tưới',
    example: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Ghi chú khi tưới cây',
    example: 'Tưới vào buổi sáng, trời nắng nhẹ',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    description: 'Lượng nước tưới (ml)',
    example: 200,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Phương pháp tưới',
    enum: WaterEnum,
    example: WaterEnum.ROOT,
  })
  @IsEnum(WaterEnum)
  method: WaterEnum;

  @ApiProperty({
    description: 'Trạng thái của bản ghi tưới (lịch/tưới thật)',
    enum: WaterStatusEnum,
    example: WaterStatusEnum.SCHEDULED,
    default: WaterStatusEnum.SCHEDULED,
  })
  @IsEnum(WaterStatusEnum)
  status: WaterStatusEnum = WaterStatusEnum.SCHEDULED;

  @ApiProperty({
    description: 'Thời gian tạo bản ghi',
    example: '2025-09-01T08:30:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Thời gian cập nhật bản ghi',
    example: '2025-09-01T08:30:00Z',
  })
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Thuộc về cây',
    type: () => Plant,
  })
  @IsOptional()
  plant?: Plant;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { WaterEnum } from '../waters.enum';

export class CreateWaterDto {
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
    description: 'ID của cây được tưới',
    example: 'uuid',
  })
  @IsUUID()
  plantId: string;
}

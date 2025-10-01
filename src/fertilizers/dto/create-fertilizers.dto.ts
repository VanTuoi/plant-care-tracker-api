import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import {
  FertilizerMethodEnum,
  FertilizerStatusEnum,
  FertilizerTypeEnum,
} from '../fertilizers.enum';

export class CreateFertilizerDto {
  @ApiPropertyOptional({
    description: 'Ghi chú khi bón phân',
    example: 'Bón sau khi tưới nước buổi sáng',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    description: 'Loại phân bón',
    enum: FertilizerTypeEnum,
    example: FertilizerTypeEnum.ORGANIC,
  })
  @IsEnum(FertilizerTypeEnum)
  fertilizerType: FertilizerTypeEnum;

  @ApiProperty({
    description: 'Lượng phân bón (gram hoặc ml)',
    example: 50,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Phương pháp bón phân',
    enum: FertilizerMethodEnum,
    example: FertilizerMethodEnum.SOIL_MIXING,
  })
  @IsEnum(FertilizerMethodEnum)
  method: FertilizerMethodEnum;

  @ApiProperty({
    description: 'Trạng thái của bản ghi bón phân (lịch/bón thật)',
    enum: FertilizerStatusEnum,
    example: FertilizerStatusEnum.SCHEDULED,
    default: FertilizerStatusEnum.SCHEDULED,
  })
  @IsEnum(FertilizerStatusEnum)
  status: FertilizerStatusEnum = FertilizerStatusEnum.SCHEDULED;

  @ApiProperty({
    description: 'ID của cây được bón phân',
    example: 'uuid',
  })
  @IsUUID()
  plantId: string;
}

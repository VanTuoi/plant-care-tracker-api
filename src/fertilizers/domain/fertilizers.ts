import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import {
  FertilizerMethodEnum,
  FertilizerStatusEnum,
  FertilizerTypeEnum,
} from '../fertilizers.enum';
import { Plant } from '../../plants/domain/plant';

export class Fertilizer {
  @ApiProperty({
    description: 'ID duy nhất cho mỗi lần bón phân',
    example: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Ghi chú khi bón phân',
    example: 'Bón vào gốc cây sau khi tưới nước',
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
    description: 'Lượng phân bón (gram)',
    example: 100,
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
    description: 'Thời gian tạo bản ghi',
    example: '2025-09-02T08:30:00Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Thời gian cập nhật bản ghi',
    example: '2025-09-02T08:30:00Z',
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

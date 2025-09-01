import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { WaterEnum } from '../waters.enum';

export class UpdateWaterDto {
  @ApiPropertyOptional({
    description: 'Ghi chú khi tưới cây',
    example: 'Tưới thêm vì đất khô',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    description: 'Lượng nước tưới (ml)',
    example: 250,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp tưới',
    enum: WaterEnum,
    example: WaterEnum.SPRAY,
  })
  @IsOptional()
  @IsEnum(WaterEnum)
  method?: WaterEnum;

  @ApiPropertyOptional({
    description: 'ID của cây được tưới',
    example: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  plantId?: string;

  @ApiPropertyOptional({
    description: 'Chi phí hoặc lượng phân bón đi kèm (wageer)',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  wageer?: number;
}

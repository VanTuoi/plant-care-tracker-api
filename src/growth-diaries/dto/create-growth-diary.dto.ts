import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsEnum } from 'class-validator';
import { Mood } from '../growth-diaries.enum';

export class CreateGrowthDiaryDto {
  @ApiProperty({
    description: 'ID cây mà ghi chép thuộc về',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  plantId: string;

  @ApiPropertyOptional({
    description: 'ID file đính kèm (nếu có)',
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  fileId?: string;

  @ApiPropertyOptional({
    description: 'Ghi chú',
    example: 'Cây ra lá mới',
  })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional({
    description: 'Tâm trạng liên quan đến ghi chép',
    enum: Mood,
    example: Mood.HAPPY,
  })
  @IsEnum(Mood)
  @IsOptional()
  mood?: Mood;
}

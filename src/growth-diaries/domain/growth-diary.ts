import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsString, IsOptional, IsEnum } from 'class-validator';
import { Mood } from '../growth-diaries.enum';
import { FileType } from '../../files/domain/file';

export class GrowthDiary {
  @ApiProperty({
    description: 'ID duy nhất cho mỗi ghi chép',
    example: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'ID cây',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  plantId: string;

  @ApiPropertyOptional({
    description: 'File đính kèm (nếu có)',
    type: () => FileType,
  })
  @IsOptional()
  file?: FileType;

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

  @ApiPropertyOptional({
    description: 'Ngày tạo',
    example: '2025-09-02T09:09:49.905Z',
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Ngày xóa (nếu có)',
    example: null,
  })
  @Type(() => Date)
  deletedAt?: Date | null;
}

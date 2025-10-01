import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class PlantImage {
  @ApiProperty({
    description: 'ID duy nhất cho mỗi ảnh',
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

  @ApiProperty({
    description: 'ID file',
    example: 'uuid',
  })
  @IsUUID()
  fileId: string;

  @ApiPropertyOptional({
    description: 'Đường dẫn file',
    example: '/uploads/abc123.jpg',
  })
  filePath?: string;

  @ApiPropertyOptional({
    description: 'Ngày tạo',
    example: '2023-05-15T08:30:00Z',
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

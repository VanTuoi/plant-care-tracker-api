import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FileDto {
  @ApiProperty({
    description: 'ID của file (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Đường dẫn file',
    example: '/uploads/my-image.png',
  })
  path: string;
}

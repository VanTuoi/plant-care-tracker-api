import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PlantDto {
  @ApiProperty({
    description: 'ID của thực thể, phải là UUID hợp lệ',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  id: string;
}

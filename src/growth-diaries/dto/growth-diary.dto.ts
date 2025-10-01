import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GrowthDiaryIdDto {
  @ApiProperty({
    description: 'ID của nhật ký, phải là UUID hợp lệ',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  id: string;
}

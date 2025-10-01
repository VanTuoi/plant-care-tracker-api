import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreatePlantImageDto {
  @ApiProperty({
    description: 'ID cây mà ảnh thuộc về',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  plantId: string;

  @ApiProperty({
    description: 'ID file đã upload',
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @IsUUID()
  fileId: string;
}

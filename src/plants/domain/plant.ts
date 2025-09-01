import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class Plant {
  @ApiProperty({
    description: 'ID duy nhất cho mỗi cây',
    example: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Tên cây',
    example: 'Cây Bàn',
  })
  @IsString()
  name?: string;
}

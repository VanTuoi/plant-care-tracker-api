import { ApiProperty } from '@nestjs/swagger';

export class IdentifyFlowerDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any; 
}

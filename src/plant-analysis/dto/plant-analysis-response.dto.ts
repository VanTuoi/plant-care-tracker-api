import { ApiProperty } from '@nestjs/swagger';

export class PlantAnalysisResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  probability: number;

  @ApiProperty({ required: false, description: 'URL of the plant image' })
  imageUrl?: string | object;
}

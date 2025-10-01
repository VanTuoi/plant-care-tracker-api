import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';

export class FindReminderOptionsByUserDto {
  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}

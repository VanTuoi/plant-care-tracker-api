import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PlantImageService } from './plant-image.service';
import { CreatePlantImageDto } from './dto/create-plant-image.dto';
import { PlantImage } from './domain/plant-image';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';

@ApiTags('Plant Images')
@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'plant-images', version: '1' })
export class PlantImageController {
  constructor(private readonly plantImageService: PlantImageService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Tạo ảnh cây thành công' })
  async create(
    @Body() dto: CreatePlantImageDto,
    @Req() req,
  ): Promise<Partial<PlantImage>> {
    return await this.plantImageService.create(dto, req.user as JwtPayloadType);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.plantImageService.deleteById(id);
  }
}

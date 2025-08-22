import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlantService } from './plant.service';
import { PlantResponseDto } from './dto/plant-response.dto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Plant')
@Controller({
  path: 'plant',
  version: '1',
})
export class PlantController {
  constructor(private readonly plantService: PlantService) { }

  @Post('identify')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(new BadRequestException('Only JPEG and PNG files are allowed'), false);
      } else {
        cb(null, true);
      }
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ type: PlantResponseDto, isArray: true, description: 'Plant identification results' })
  @HttpCode(HttpStatus.OK)
  async identify(@UploadedFile() file: Express.Multer.File): Promise<PlantResponseDto[]> {
    const plants = await this.plantService.identify(file);

    return plants.map(p => ({
      name: p.name,
      probability: p.probability,
      imageUrl: p.imageUrl,
    }));
  }
}

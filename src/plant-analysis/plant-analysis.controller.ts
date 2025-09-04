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
import { PlantAnalysisService } from './plant-analysis.service';
import { PlantAnalysisResponseDto } from './dto/plant-analysis-response.dto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Plant Analysis')
@Controller({
  path: 'plant-analysis',
  version: '1',
})
export class PlantAnalysisController {
  constructor(private readonly plantAnalysisService: PlantAnalysisService) {}

  @Post('identify')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
          cb(
            new BadRequestException('Only JPEG and PNG files are allowed'),
            false,
          );
        } else {
          cb(null, true);
        }
      },
    }),
  )
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
  @ApiOkResponse({
    type: PlantAnalysisResponseDto,
    isArray: true,
    description: 'Plant identification results',
  })
  @HttpCode(HttpStatus.OK)
  async identify(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PlantAnalysisResponseDto[]> {
    const plants = await this.plantAnalysisService.identify(file);

    return plants.map((p) => ({
      name: p.name,
      probability: p.probability,
      imageUrl: p.imageUrl,
    }));
  }
}

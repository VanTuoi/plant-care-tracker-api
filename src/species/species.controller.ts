import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SpeciesService } from './species.service';
import { Species } from './domain/species';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { QuerySpeciesDto } from './dto/query-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
@ApiTags('Species')
@Controller({ path: 'species', version: '1' })
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({ type: Species })
  @SerializeOptions({ groups: ['admin'] })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.create(dto);
  }

  @Get('export')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  exportJson(): Promise<Species[]> {
    return this.speciesService.exportToJson();
  }

  @Post('import')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async importJson(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Species[]> {
    const json = JSON.parse(file.buffer.toString());
    return this.speciesService.importFromJson(json);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Species['id']): Promise<void> {
    return this.speciesService.remove(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.admin)
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: Species['id'],
    @Body() dto: UpdateSpeciesDto,
  ): Promise<Species | null> {
    return this.speciesService.update(id, dto);
  }

  @Get('sample-import')
  @HttpCode(HttpStatus.OK)
  getSampleJson(): Omit<
    Species,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >[] {
    return this.speciesService.getSampleJson();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QuerySpeciesDto,
  ): Promise<InfinityPaginationResponseDto<Species>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    const data = await this.speciesService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: { page, limit },
    });

    return infinityPagination(data, { page, limit });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: Species['id']): Promise<Species | null> {
    return this.speciesService.findById(id);
  }
}

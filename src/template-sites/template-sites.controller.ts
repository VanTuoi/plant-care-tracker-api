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
import { TemplateSitesService } from './template-sites.service';
import { TemplateSite } from './domain/template-site';
import { CreateTemplateSiteDto } from './dto/create-template-site.dto';
import { UpdateTemplateSiteDto } from './dto/update-template-site.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { QueryTemplateSiteDto } from './dto/query-template-site.dto';
import { TemplateSiteDto } from './dto/template-site.dto';

@ApiBearerAuth()
@ApiTags('TemplateSites')
@Controller({ path: 'template-sites', version: '1' })
export class TemplateSitesController {
  constructor(private readonly templateSitesService: TemplateSitesService) {}

  @Post()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({ type: TemplateSite })
  @SerializeOptions({ groups: ['admin'] })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTemplateSiteDto): Promise<TemplateSite> {
    return this.templateSitesService.create(dto);
  }

  @Get('export')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  exportJson(): Promise<TemplateSite[]> {
    return this.templateSitesService.exportToJson();
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
  importJson(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<TemplateSite[]> {
    const json = JSON.parse(file.buffer.toString());
    return this.templateSitesService.importFromJson(json);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: TemplateSiteDto): Promise<void> {
    return this.templateSitesService.remove(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  update(
    @Param() { id }: TemplateSiteDto,
    @Body() dto: UpdateTemplateSiteDto,
  ): Promise<TemplateSite | null> {
    return this.templateSitesService.update(id, dto);
  }

  @Get('sample-import')
  @HttpCode(HttpStatus.OK)
  getSampleJson(): Omit<
    TemplateSite,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >[] {
    return this.templateSitesService.getSampleJson();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryTemplateSiteDto,
  ): Promise<InfinityPaginationResponseDto<TemplateSite>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    const data = await this.templateSitesService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: { page, limit },
    });

    return infinityPagination(data, { page, limit });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findOne(@Param() { id }: TemplateSiteDto): Promise<TemplateSite | null> {
    return this.templateSitesService.findById(id);
  }
}

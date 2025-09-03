import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { WaterEnum } from '../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../fertilizers/fertilizers.enum';
import {
  DifficultyLevelEnum,
  SunlightNeedEnum,
} from '../../species/species.enum';
import { Type } from 'class-transformer';
import { PlantSizeEnum } from '../plant.enum';
import { PlantImage } from '../../plant-image/domain/plant-image';

export class Plant {
  @ApiProperty({
    description: 'ID duy nhất cho mỗi cây',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: 'Tên cây', example: 'Hoa Hồng Đỏ' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Tên khoa học của cây',
    example: 'Rosa rubiginosa',
  })
  @IsString()
  @IsOptional()
  scientificName?: string;

  @ApiPropertyOptional({
    description: 'Kích thước cây',
    enum: PlantSizeEnum,
    example: PlantSizeEnum.MEDIUM,
  })
  @IsEnum(PlantSizeEnum)
  @IsOptional()
  size?: PlantSizeEnum;

  @ApiPropertyOptional({
    description: 'Cây được trồng trong đất hay không',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  inGround: boolean = true;

  @ApiPropertyOptional({
    description: 'Cây đã chết hay chưa',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDead: boolean = false;

  @ApiPropertyOptional({ description: 'Tần suất tưới (số ngày)', example: 3 })
  @IsNumber()
  @IsOptional()
  wateringFrequency?: number;

  @ApiPropertyOptional({ description: 'Lượng nước tưới (ml)', example: 500 })
  @IsNumber()
  @IsOptional()
  wateringAmount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp tưới',
    enum: WaterEnum,
    example: WaterEnum.ROOT,
  })
  @IsEnum(WaterEnum)
  @IsOptional()
  wateringMethod?: WaterEnum;

  @ApiPropertyOptional({
    description: 'Tần suất bón phân (số ngày)',
    example: 14,
  })
  @IsNumber()
  @IsOptional()
  fertilizingFrequency?: number;

  @ApiPropertyOptional({ description: 'Lượng phân bón (gram)', example: 100 })
  @IsNumber()
  @IsOptional()
  fertilizingAmount?: number;

  @ApiPropertyOptional({
    description: 'Phương pháp bón phân',
    enum: FertilizerMethodEnum,
    example: FertilizerMethodEnum.SOIL_MIXING,
  })
  @IsEnum(FertilizerMethodEnum)
  @IsOptional()
  fertilizingMethod?: FertilizerMethodEnum;

  @ApiPropertyOptional({
    description: 'Loại phân bón',
    enum: FertilizerTypeEnum,
    example: FertilizerTypeEnum.ORGANIC,
  })
  @IsEnum(FertilizerTypeEnum)
  @IsOptional()
  fertilizerType?: FertilizerTypeEnum;

  @ApiPropertyOptional({
    description: 'Nhu cầu ánh sáng của cây',
    enum: SunlightNeedEnum,
    example: SunlightNeedEnum.FULL_SUN,
  })
  @IsEnum(SunlightNeedEnum)
  @IsOptional()
  sunlightNeed?: SunlightNeedEnum;

  @ApiPropertyOptional({
    description: 'Mức độ khó chăm sóc',
    enum: DifficultyLevelEnum,
    example: DifficultyLevelEnum.MODERATE,
  })
  @IsEnum(DifficultyLevelEnum)
  @IsOptional()
  difficultyLevel?: DifficultyLevelEnum;

  @ApiPropertyOptional({
    description: 'Ngày tạo',
    example: '2023-05-15T08:30:00Z',
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Ngày cập nhật',
    example: '2023-06-20T14:25:00Z',
  })
  @Type(() => Date)
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Ngày xóa (nếu có)',
    example: null,
  })
  @Type(() => Date)
  deletedAt?: Date | null;

  @ApiPropertyOptional({
    description: 'ID loài cây',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsString()
  @IsOptional()
  speciesId?: string;

  @ApiPropertyOptional({
    description: 'Danh sách tất cả ảnh của cây',
    type: () => [PlantImage],
  })
  @IsOptional()
  images?: PlantImage[];

  @ApiPropertyOptional({
    description: 'ID người dùng sở hữu cây',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'ID khu vực (site)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsString()
  @IsOptional()
  siteId?: string;
}

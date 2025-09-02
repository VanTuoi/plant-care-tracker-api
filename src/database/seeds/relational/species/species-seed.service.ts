import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesEntity } from '../../../../species/infrastructure/persistence/relational/entities/species.entity';
import {
  DifficultyLevelEnum,
  SunlightNeedEnum,
} from '../../../../species/species.enum';
import { WaterEnum } from '../../../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../../../fertilizers/fertilizers.enum';

@Injectable()
export class SpeciesSeedService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private repository: Repository<SpeciesEntity>,
  ) {}

  async run() {
    const defaultSpecies: Partial<SpeciesEntity>[] = [
      {
        name: 'Cây Lưỡi Hổ',
        scientificName: 'Sansevieria trifasciata',
        wateringFrequency: 7,
        wateringAmount: 200,
        wateringMethod: WaterEnum.ROOT,
        fertilizingFrequency: 30,
        fertilizingAmount: 50,
        fertilizingMethod: FertilizerMethodEnum.SOIL_MIXING,
        fertilizerType: FertilizerTypeEnum.ORGANIC,
        sunlightNeed: SunlightNeedEnum.PARTIAL_SUN,
        difficultyLevel: DifficultyLevelEnum.EASY,
      },
      {
        name: 'Cây Trầu Bà',
        scientificName: 'Epipremnum aureum',
        wateringFrequency: 5,
        wateringAmount: 150,
        wateringMethod: WaterEnum.SPRAY,
        fertilizingFrequency: 20,
        fertilizingAmount: 40,
        fertilizingMethod: FertilizerMethodEnum.LIQUID_FEED,
        fertilizerType: FertilizerTypeEnum.NPK,
        sunlightNeed: SunlightNeedEnum.SHADE,
        difficultyLevel: DifficultyLevelEnum.MODERATE,
      },
    ];

    for (const species of defaultSpecies) {
      const exists = await this.repository.findOne({
        where: { scientificName: species.scientificName },
      });
      if (!exists) {
        await this.repository.save(this.repository.create(species));
      }
    }
  }
}

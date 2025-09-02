import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesEntity } from '../../../../species/infrastructure/persistence/relational/entities/species.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SiteEntity } from '../../../../sites/infrastructure/persistence/relational/entities/site.entity';
import { WaterEnum } from '../../../../waters/waters.enum';
import {
  FertilizerMethodEnum,
  FertilizerTypeEnum,
} from '../../../../fertilizers/fertilizers.enum';
import {
  DifficultyLevelEnum,
  SunlightNeedEnum,
} from '../../../../species/species.enum';
import { PlantEntity } from '../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { PlantSizeEnum } from '../../../../plants/plant.enum';

@Injectable()
export class PlantSeedService {
  constructor(
    @InjectRepository(PlantEntity)
    private plantRepo: Repository<PlantEntity>,
    @InjectRepository(SpeciesEntity)
    private speciesRepo: Repository<SpeciesEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(SiteEntity)
    private siteRepo: Repository<SiteEntity>,
  ) {}

  async run() {
    const species = await this.speciesRepo.findOne({
      where: { scientificName: 'Sansevieria trifasciata' },
    });
    const user = await this.userRepo.findOne({
      where: { email: 'john.doe@example.com' },
    });
    const site = await this.siteRepo.findOne({
      where: { name: 'Ban công nhà A' },
    });

    if (!species || !user || !site) {
      console.log('⚠️ Seed Plant skipped: missing species/user/site');
      return;
    }

    const exists = await this.plantRepo.findOne({
      where: { scientificName: species.scientificName },
    });

    if (!exists) {
      await this.plantRepo.save(
        this.plantRepo.create({
          name: 'Lưỡi Hổ trong vườn',
          scientificName: species.scientificName,
          size: PlantSizeEnum.MEDIUM,
          inGround: true,
          isDead: false,
          wateringFrequency: 7,
          wateringAmount: 200,
          wateringMethod: WaterEnum.ROOT,
          fertilizingFrequency: 30,
          fertilizingAmount: 50,
          fertilizingMethod: FertilizerMethodEnum.SOIL_MIXING,
          fertilizerType: FertilizerTypeEnum.ORGANIC,
          sunlightNeed: SunlightNeedEnum.PARTIAL_SUN,
          difficultyLevel: DifficultyLevelEnum.EASY,
          user,
          site,
          species,
        }),
      );
    }
  }
}

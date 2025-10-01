import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantEntity } from '../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { SpeciesEntity } from '../../../../species/infrastructure/persistence/relational/entities/species.entity';
import { SiteEntity } from '../../../../sites/infrastructure/persistence/relational/entities/site.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { PlantSizeEnum } from '../../../../plants/plant.enum';

@Injectable()
export class PlantSeedService {
  constructor(
    @InjectRepository(PlantEntity)
    private readonly plantRepo: Repository<PlantEntity>,
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepo: Repository<SpeciesEntity>,
    @InjectRepository(SiteEntity)
    private readonly siteRepo: Repository<SiteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async run() {
    const user = await this.userRepo.findOne({
      where: { email: 'john.doe@example.com' },
    });
    if (!user) {
      console.log('⚠️ Seed Plant skipped: missing user');
      return;
    }

    const species1 = await this.speciesRepo.findOne({
      where: { scientificName: 'Sansevieria trifasciata' },
    });
    const species2 = await this.speciesRepo.findOne({
      where: { scientificName: 'Epipremnum aureum' },
    });

    if (!species1 || !species2) {
      console.log('⚠️ Seed Plant skipped: missing species');
      return;
    }

    const sites = await this.siteRepo.find();
    if (!sites.length) {
      console.log('⚠️ Seed Plant skipped: no site found');
      return;
    }

    for (const site of sites) {
      const existingPlants = await this.plantRepo.find({
        where: { site: { id: site.id } },
      });

      if (existingPlants.length < 2) {
        await this.plantRepo.save([
          this.plantRepo.create({
            name: `${site.name} - Cây Lưỡi Hổ`,
            scientificName: species1.scientificName,
            size: PlantSizeEnum.MEDIUM,
            inGround: true,
            isDead: false,
            wateringFrequency: species1.wateringFrequency,
            wateringAmount: species1.wateringAmount,
            wateringMethod: species1.wateringMethod,
            fertilizingFrequency: species1.fertilizingFrequency,
            fertilizingAmount: species1.fertilizingAmount,
            fertilizingMethod: species1.fertilizingMethod,
            fertilizerType: species1.fertilizerType,
            sunlightNeed: species1.sunlightNeed,
            difficultyLevel: species1.difficultyLevel,
            user,
            site,
            species: species1,
          }),
          this.plantRepo.create({
            name: `${site.name} - Cây Trầu Bà`,
            scientificName: species2.scientificName,
            size: PlantSizeEnum.SMALL,
            inGround: false,
            isDead: false,
            wateringFrequency: species2.wateringFrequency,
            wateringAmount: species2.wateringAmount,
            wateringMethod: species2.wateringMethod,
            fertilizingFrequency: species2.fertilizingFrequency,
            fertilizingAmount: species2.fertilizingAmount,
            fertilizingMethod: species2.fertilizingMethod,
            fertilizerType: species2.fertilizerType,
            sunlightNeed: species2.sunlightNeed,
            difficultyLevel: species2.difficultyLevel,
            user,
            site,
            species: species2,
          }),
        ]);
      }
    }
  }
}

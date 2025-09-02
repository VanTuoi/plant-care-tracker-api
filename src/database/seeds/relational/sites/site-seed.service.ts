import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteEntity } from '../../../../sites/infrastructure/persistence/relational/entities/site.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { TemplateSiteEntity } from '../../../../template-sites/infrastructure/persistence/relational/entities/template-sites.entity';

@Injectable()
export class SiteSeedService {
  constructor(
    @InjectRepository(SiteEntity)
    private readonly siteRepo: Repository<SiteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(TemplateSiteEntity)
    private readonly templateRepo: Repository<TemplateSiteEntity>,
  ) {}

  async run() {
    const user = await this.userRepo.findOne({
      where: { email: 'john.doe@example.com' },
    });

    const template = await this.templateRepo.findOne({
      where: { name: 'Ban công hướng Nam' },
    });

    if (!user || !template) return;

    const sites: Partial<SiteEntity>[] = [
      {
        name: 'Ban công nhà A',
        description: 'Site seed đầu tiên',
        user,
        template,
        sunlight: template.sunlight,
        lightDuration: template.lightDuration,
        lightType: template.lightType,
        soilMoisture: template.soilMoisture,
        soilType: template.soilType,
        phSoil: template.phSoil,
        temperature: template.temperature,
        humidity: template.humidity,
        windExposure: template.windExposure,
        latitude: template.latitude,
        longitude: template.longitude,
        altitude: template.altitude,
      },
      {
        name: 'Góc phòng khách nhà B',
        description: 'Site seed thứ hai',
        user,
        template,
        sunlight: template.sunlight,
        lightDuration: template.lightDuration,
        lightType: template.lightType,
        soilMoisture: template.soilMoisture,
        soilType: template.soilType,
        phSoil: template.phSoil,
        temperature: template.temperature,
        humidity: template.humidity,
        windExposure: template.windExposure,
        latitude: template.latitude,
        longitude: template.longitude,
        altitude: template.altitude,
      },
    ];

    for (const site of sites) {
      const exists = await this.siteRepo.findOne({
        where: { name: site.name },
      });
      if (!exists) {
        await this.siteRepo.save(this.siteRepo.create(site));
      }
    }
  }
}

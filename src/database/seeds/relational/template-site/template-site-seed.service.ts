import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateSiteEntity } from '../../../../template-sites/infrastructure/persistence/relational/entities/template-sites.entity';
import {
  LightType,
  SoilType,
  Sunlight,
} from '../../../../template-sites/template-sites.enum';

@Injectable()
export class TemplateSiteSeedService {
  constructor(
    @InjectRepository(TemplateSiteEntity)
    private repository: Repository<TemplateSiteEntity>,
  ) {}

  async run() {
    const defaultSites: Partial<TemplateSiteEntity>[] = [
      {
        name: 'Ban công hướng Nam',
        description: 'Khu vực nhiều nắng buổi sáng',
        sunlight: Sunlight.FULL_SUN,
        lightDuration: 6,
        lightType: LightType.NATURAL,
        soilMoisture: 50,
        soilType: SoilType.CLAY,
        phSoil: 6.5,
        temperature: 28,
        humidity: 65,
        windExposure: 50,
        latitude: 10.0452,
        longitude: 105.7469,
        altitude: 15,
      },
      {
        name: 'Trong phòng khách',
        description: 'Ánh sáng gián tiếp qua cửa kính',
        sunlight: Sunlight.PARTIAL_SUN,
        lightDuration: 4,
        lightType: LightType.LED,
        soilMoisture: 30,
        soilType: SoilType.SANDY,
        phSoil: 7.0,
        temperature: 27,
        humidity: 70,
        windExposure: 10,
        latitude: 10.0452,
        longitude: 105.7469,
        altitude: 10,
      },
    ];

    for (const site of defaultSites) {
      const exists = await this.repository.findOne({
        where: { name: site.name },
      });
      if (!exists) {
        await this.repository.save(this.repository.create(site));
      }
    }
  }
}

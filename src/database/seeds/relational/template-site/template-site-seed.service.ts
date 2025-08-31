import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateSiteEntity } from '../../../../template-site/infrastructure/persistence/relational/entities/template-site.entity';

@Injectable()
export class TemplateSiteSeedService {
  constructor(
    @InjectRepository(TemplateSiteEntity)
    private repository: Repository<TemplateSiteEntity>,
  ) {}

  async run() {
    const defaultSites = [
      {
        name: 'Ban công hướng Nam',
        description: 'Khu vực nhiều nắng buổi sáng',
        sunlight: 'full_sun',
        lightDuration: '6h/day',
        lightType: 'tự nhiên',
        soilMoisture: 'ẩm vừa',
        soilType: 'đất thịt',
        phSoil: '6.5',
        temperature: 28,
        humidity: 65,
        windExposure: 'trung bình',
        latitude: 10.0452,
        longitude: 105.7469,
        altitude: 15,
      },
      {
        name: 'Trong phòng khách',
        description: 'Ánh sáng gián tiếp qua cửa kính',
        sunlight: 'partial_shade',
        lightDuration: '4h/day',
        lightType: 'nhân tạo + tự nhiên',
        soilMoisture: 'khô',
        soilType: 'đất cát',
        phSoil: '7.0',
        temperature: 27,
        humidity: 70,
        windExposure: 'yếu',
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

import { SiteEntity } from '../entities/site.entity';
import { Site } from '../../../../domain/site';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { TemplateSiteEntity } from '../../../../../template-sites/infrastructure/persistence/relational/entities/template-sites.entity';

export class SiteMapper {
  static toDomain(raw: SiteEntity): Site {
    const domainEntity = new Site();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.sunlight = raw.sunlight;
    domainEntity.lightDuration = raw.lightDuration;
    domainEntity.lightType = raw.lightType;
    domainEntity.soilMoisture = raw.soilMoisture;
    domainEntity.soilType = raw.soilType;
    domainEntity.phSoil = raw.phSoil;
    domainEntity.temperature = raw.temperature;
    domainEntity.humidity = raw.humidity;
    domainEntity.windExposure = raw.windExposure;
    domainEntity.latitude = raw.latitude;
    domainEntity.longitude = raw.longitude;
    domainEntity.altitude = raw.altitude;
    domainEntity.userId = raw.user?.id ?? null;
    domainEntity.templateSiteId = raw.template?.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt ?? null;
    return domainEntity;
  }

  static toPersistence(domainEntity: Site): SiteEntity {
    const persistenceEntity = new SiteEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name!;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.sunlight = domainEntity.sunlight;
    persistenceEntity.lightDuration = domainEntity.lightDuration;
    persistenceEntity.lightType = domainEntity.lightType;
    persistenceEntity.soilMoisture = domainEntity.soilMoisture;
    persistenceEntity.soilType = domainEntity.soilType;
    persistenceEntity.phSoil = domainEntity.phSoil;
    persistenceEntity.temperature = domainEntity.temperature;
    persistenceEntity.humidity = domainEntity.humidity;
    persistenceEntity.windExposure = domainEntity.windExposure;
    persistenceEntity.latitude = domainEntity.latitude;
    persistenceEntity.longitude = domainEntity.longitude;
    persistenceEntity.altitude = domainEntity.altitude;

    if (domainEntity.userId) {
      const userEntity = new UserEntity();
      userEntity.id = domainEntity.userId;
      persistenceEntity.user = userEntity;
    }

    if (domainEntity.templateSiteId) {
      const templateSiteEntity = new TemplateSiteEntity();
      templateSiteEntity.id = domainEntity.templateSiteId;
      persistenceEntity.template = templateSiteEntity;
    }

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt ?? null;

    return persistenceEntity;
  }
}

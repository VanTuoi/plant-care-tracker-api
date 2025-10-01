import { TemplateSite } from '../../../../domain/template-site';
import { TemplateSiteEntity } from '../entities/template-sites.entity';

export class TemplateSiteMapper {
  static toDomain(raw: TemplateSiteEntity): TemplateSite {
    const domainEntity = new TemplateSite();
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
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: TemplateSite): TemplateSiteEntity {
    const persistenceEntity = new TemplateSiteEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
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
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }

  static toSiteBase(template: TemplateSite) {
    return {
      name: template.name,
      description: template.description,
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
    };
  }
}

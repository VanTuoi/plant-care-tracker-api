import { Plant } from '../../../../domain/plant';
import { PlantEntity } from '../entities/plants.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { SiteEntity } from '../../../../../sites/infrastructure/persistence/relational/entities/site.entity';
import { SpeciesEntity } from '../../../../../species/infrastructure/persistence/relational/entities/species.entity';
import { PlantImageMapper } from '../../../../../plant-image/infrastructure/persistence/relational/mappers/plant-image.mapper';

export class PlantMapper {
  static toDomain(raw: PlantEntity): Plant {
    const domainEntity = new Plant();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.scientificName = raw.scientificName;
    domainEntity.size = raw.size;
    domainEntity.inGround = raw.inGround;
    domainEntity.isDead = raw.isDead;
    domainEntity.wateringFrequency = raw.wateringFrequency;
    domainEntity.wateringAmount = raw.wateringAmount;
    domainEntity.wateringMethod = raw.wateringMethod;
    domainEntity.fertilizingFrequency = raw.fertilizingFrequency;
    domainEntity.fertilizingAmount = raw.fertilizingAmount;
    domainEntity.fertilizingMethod = raw.fertilizingMethod;
    domainEntity.fertilizerType = raw.fertilizerType;
    domainEntity.sunlightNeed = raw.sunlightNeed;
    domainEntity.difficultyLevel = raw.difficultyLevel;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    domainEntity.speciesId = raw.species?.id;
    domainEntity.userId = raw.user?.id;
    domainEntity.site = raw.site;

    domainEntity.images = raw.images?.map(PlantImageMapper.toDomain);

    return domainEntity;
  }

  static toPersistence(domainEntity: Plant): PlantEntity {
    const persistenceEntity = new PlantEntity();

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.name = domainEntity.name;
    persistenceEntity.scientificName = domainEntity.scientificName;
    persistenceEntity.size = domainEntity.size;
    persistenceEntity.inGround = domainEntity.inGround;
    persistenceEntity.isDead = domainEntity.isDead;
    persistenceEntity.wateringFrequency = domainEntity.wateringFrequency;
    persistenceEntity.wateringAmount = domainEntity.wateringAmount;
    persistenceEntity.wateringMethod = domainEntity.wateringMethod;
    persistenceEntity.fertilizingFrequency = domainEntity.fertilizingFrequency;
    persistenceEntity.fertilizingAmount = domainEntity.fertilizingAmount;
    persistenceEntity.fertilizingMethod = domainEntity.fertilizingMethod;
    persistenceEntity.fertilizerType = domainEntity.fertilizerType;
    persistenceEntity.sunlightNeed = domainEntity.sunlightNeed;
    persistenceEntity.difficultyLevel = domainEntity.difficultyLevel;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    if (domainEntity.speciesId) {
      const speciesEntity = new SpeciesEntity();
      speciesEntity.id = domainEntity.speciesId;
      persistenceEntity.species = speciesEntity;
    }

    if (domainEntity.userId) {
      const userEntity = new UserEntity();
      userEntity.id = domainEntity.userId;
      persistenceEntity.user = userEntity;
    }

    if (domainEntity.site) {
      const siteEntity = new SiteEntity();
      siteEntity.id = domainEntity.site.id;
      persistenceEntity.site = siteEntity;
    }

    return persistenceEntity;
  }
}

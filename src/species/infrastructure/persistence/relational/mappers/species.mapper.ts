import { Species } from '../../../../domain/species';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { SpeciesEntity } from '../entities/species.entity';

export class SpeciesMapper {
  static toDomain(raw: SpeciesEntity): Species {
    const domainEntity = new Species();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.scientificName = raw.scientificName;
    domainEntity.imageId = raw?.image?.id;
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
    return domainEntity;
  }

  static toPersistence(domainEntity: Species): SpeciesEntity {
    const persistenceEntity = new SpeciesEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.scientificName = domainEntity.scientificName;

    if (domainEntity.imageId) {
      const imageEntity = new FileEntity();
      imageEntity.id = domainEntity.imageId;
      persistenceEntity.image = imageEntity;
    }

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
    return persistenceEntity;
  }

  static toSpeciesBase(template: Species) {
    return {
      name: template.name,
      scientificName: template.scientificName,
      imageId: template.imageId,
      wateringFrequency: template.wateringFrequency,
      wateringAmount: template.wateringAmount,
      wateringMethod: template.wateringMethod,
      fertilizingFrequency: template.fertilizingFrequency,
      fertilizingAmount: template.fertilizingAmount,
      fertilizingMethod: template.fertilizingMethod,
      fertilizerType: template.fertilizerType,
      sunlightNeed: template.sunlightNeed,
      difficultyLevel: template.difficultyLevel,
    };
  }
}

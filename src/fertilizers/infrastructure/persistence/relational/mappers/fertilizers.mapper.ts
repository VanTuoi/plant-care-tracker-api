import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { Fertilizer } from '../../../../domain/fertilizers';
import { FertilizerEntity } from '../entities/fertilizers.entity';

export class FertilizerMapper {
  static toDomain(raw: FertilizerEntity): Fertilizer {
    const domainEntity = new Fertilizer();
    domainEntity.id = raw.id;
    domainEntity.note = raw.note;
    domainEntity.fertilizerType = raw.fertilizerType;
    domainEntity.amount = raw.amount;
    domainEntity.method = raw.method;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.plantId = raw.plant?.id;

    return domainEntity;
  }

  static toPersistence(domainEntity: Fertilizer): FertilizerEntity {
    const persistenceEntity = new FertilizerEntity();

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.note = domainEntity.note;
    persistenceEntity.fertilizerType = domainEntity.fertilizerType;
    persistenceEntity.amount = domainEntity.amount;
    persistenceEntity.method = domainEntity.method;

    if (domainEntity.plantId) {
      const plantEntity = new PlantEntity();
      plantEntity.id = domainEntity.plantId;
      persistenceEntity.plant = plantEntity;
    }

    return persistenceEntity;
  }
}

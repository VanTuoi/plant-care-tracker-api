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
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.plant = raw.plant;

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
    persistenceEntity.status = domainEntity.status;

    if (domainEntity.plant?.id) {
      const plantEntity = new PlantEntity();
      plantEntity.id = domainEntity.plant.id;
      persistenceEntity.plant = plantEntity;
    }

    return persistenceEntity;
  }
}

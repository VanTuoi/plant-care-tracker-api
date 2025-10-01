import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { Water } from '../../../../domain/water';
import { WaterEntity } from '../entities/water.entity';

export class WaterMapper {
  static toDomain(raw: WaterEntity): Water {
    const domainEntity = new Water();
    domainEntity.id = raw.id;
    domainEntity.note = raw.note;
    domainEntity.amount = raw.amount;
    domainEntity.method = raw.method;
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.plant = raw.plant;

    return domainEntity;
  }

  static toPersistence(domainEntity: Water): WaterEntity {
    const persistenceEntity = new WaterEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.note = domainEntity.note;
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

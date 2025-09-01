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
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.plantId = raw.plant?.id;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: Omit<Water, 'id' | 'createdAt' | 'updatedAt'>,
  ): WaterEntity {
    const persistenceEntity = new WaterEntity();
    persistenceEntity.note = domainEntity.note;
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

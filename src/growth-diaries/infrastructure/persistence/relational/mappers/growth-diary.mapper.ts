import { GrowthDiary } from '../../../../domain/growth-diary';
import { GrowthDiaryEntity } from '../entities/growth-diary.entity';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

export class GrowthDiaryMapper {
  static toDomain(raw: GrowthDiaryEntity): GrowthDiary {
    const domain = new GrowthDiary();
    domain.id = raw.id;
    domain.plantId = raw.plantId || raw.plant?.id;

    domain.file = raw.file;
    domain.note = raw.note;
    domain.mood = raw.mood;
    domain.createdAt = raw.createdAt;
    domain.deletedAt = raw.deletedAt ?? null;

    return domain;
  }

  static toPersistence(domain: GrowthDiary): GrowthDiaryEntity {
    const entity = new GrowthDiaryEntity();

    if (domain.id) {
      entity.id = domain.id;
    }

    entity.plantId = domain.plantId;
    const plant = new PlantEntity();
    plant.id = domain.plantId;
    entity.plant = plant;

    if (domain.file) {
      const file = new FileEntity();
      file.id = domain.file.id;
      entity.file = file;
    }

    entity.note = domain.note;
    entity.mood = domain.mood;
    entity.createdAt = domain.createdAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}

import { PlantImage } from '../../../../domain/plant-image';
import { PlantImageEntity } from '../entities/plant-image.entity';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

export class PlantImageMapper {
  static toDomain(raw: PlantImageEntity): PlantImage {
    const domain = new PlantImage();
    domain.id = raw.id;
    domain.plantId = raw.plantId || raw.plant?.id;

    domain.fileId = raw.fileId;
    domain.filePath = raw.file?.path;

    domain.createdAt = raw.createdAt;
    domain.deletedAt = raw.deletedAt ?? null;
    return domain;
  }

  static toPersistence(domain: PlantImage): PlantImageEntity {
    const entity = new PlantImageEntity();
    if (domain.id) {
      entity.id = domain.id;
    }

    entity.plantId = domain.plantId;
    const plant = new PlantEntity();
    plant.id = domain.plantId;
    entity.plant = plant;

    entity.fileId = domain.fileId;
    if (domain.fileId && domain.filePath) {
      const file = new FileEntity();
      file.id = domain.fileId;
      file.path = domain.filePath;
      entity.file = file;
    }

    entity.createdAt = domain.createdAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}

import { PlantImage } from '../../domain/plant-image';

export abstract class PlantImageRepository {
  abstract findAllByPlantId(
    plantId: PlantImage['plantId'],
  ): Promise<PlantImage[]>;

  abstract create(
    data: Omit<PlantImage, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<PlantImage>;

  abstract deleteById(id: PlantImage['id']): Promise<void>;
}

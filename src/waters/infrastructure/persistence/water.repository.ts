import { Plant } from '../../../plants/domain/plant';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Water } from '../../domain/water';

export abstract class WaterRepository {
  abstract create(
    data: Omit<Water, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Water>;

  abstract findAll(): Promise<Water[]>;

  abstract findById(id: Water['id']): Promise<NullableType<Water>>;

  abstract findByPlantIds(plantIds: Plant['id'][]): Promise<Water[]>;

  abstract update(
    id: Water['id'],
    payload: DeepPartial<Water>,
  ): Promise<Water | null>;
}

import { Plant } from '../../../plants/domain/plant';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Fertilizer } from '../../domain/fertilizers';

export abstract class FertilizerRepository {
  abstract create(
    data: Omit<Fertilizer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Fertilizer>;

  abstract findAll(): Promise<Fertilizer[]>;

  abstract findById(id: Fertilizer['id']): Promise<NullableType<Fertilizer>>;

  abstract findByPlantIds(plantIds: Plant['id'][]): Promise<Fertilizer[]>;

  abstract update(
    id: Fertilizer['id'],
    payload: DeepPartial<Fertilizer>,
  ): Promise<Fertilizer | null>;
}

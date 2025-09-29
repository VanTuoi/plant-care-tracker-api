import { GrowthDiary } from '../../domain/growth-diary';

export abstract class GrowthDiaryRepository {
  abstract findAllByPlantId(
    plantId: GrowthDiary['plantId'],
  ): Promise<GrowthDiary[]>;

  abstract getAll(): Promise<GrowthDiary[]>;

  abstract getById(id: GrowthDiary['id']): Promise<GrowthDiary | null>;

  abstract create(
    data: Omit<GrowthDiary, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<GrowthDiary>;

  abstract deleteById(id: GrowthDiary['id']): Promise<void>;

  abstract findByFileId(
    fileId: NonNullable<GrowthDiary['file']>['id'],
  ): Promise<GrowthDiary | null>;
}

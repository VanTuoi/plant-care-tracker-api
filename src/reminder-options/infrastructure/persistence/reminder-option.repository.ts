import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { ReminderOption } from '../../domain/reminder-option';

export abstract class ReminderOptionRepository {
  abstract create(data: Omit<ReminderOption, 'id'>): Promise<ReminderOption>;

  abstract findById(
    id: ReminderOption['id'],
  ): Promise<NullableType<ReminderOption>>;

  abstract findByUserId(
    userId: ReminderOption['userId'],
  ): Promise<ReminderOption[]>;

  abstract getAll(): Promise<ReminderOption[]>;

  abstract findAllActive(): Promise<ReminderOption[]>;

  abstract update(
    id: ReminderOption['id'],
    payload: DeepPartial<ReminderOption>,
  ): Promise<ReminderOption | null>;
}

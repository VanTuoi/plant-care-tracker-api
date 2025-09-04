import { ReminderOption } from '../../../../domain/reminder-option';
import { ReminderOptionEntity } from '../entities/reminder-option.entity';

export class ReminderOptionMapper {
  static toDomain(raw: ReminderOptionEntity): ReminderOption {
    const domainEntity = new ReminderOption();
    domainEntity.id = raw.id;
    domainEntity.isEnabled = raw.isEnabled;
    domainEntity.sendMode = raw.sendMode;
    domainEntity.startTime = raw.startTime;
    domainEntity.endTime = raw.endTime;
    domainEntity.priority = raw.priority;
    domainEntity.channels = raw.channels;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.userId = raw.userId;
    return domainEntity;
  }

  static toPersistence(domainEntity: ReminderOption): ReminderOptionEntity {
    const persistenceEntity = new ReminderOptionEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.isEnabled = domainEntity.isEnabled;
    persistenceEntity.sendMode = domainEntity.sendMode;
    persistenceEntity.startTime = domainEntity.startTime;
    persistenceEntity.endTime = domainEntity.endTime;
    persistenceEntity.priority = domainEntity.priority;
    persistenceEntity.channels = domainEntity.channels;
    persistenceEntity.updatedAt = domainEntity.updatedAt ?? new Date();
    persistenceEntity.userId = domainEntity.userId;
    return persistenceEntity;
  }
}

import { NotificationLog } from '../../../../domain/notification-log';
import { NotificationLogEntity } from '../entities/notification-log.entity';
import { NotificationEntity } from '../../../../../notifications/infrastructure/persistence/relational/entities/notifications.entity';

export class NotificationLogMapper {
  static toDomain(raw: NotificationLogEntity): NotificationLog {
    const domainEntity = new NotificationLog();
    domainEntity.id = raw.id;
    domainEntity.status = raw.status;
    domainEntity.channel = raw.channel;
    domainEntity.errorMessage = raw.errorMessage;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.notificationId = raw.notification?.id;

    return domainEntity;
  }

  static toPersistence(domainEntity: NotificationLog): NotificationLogEntity {
    const persistenceEntity = new NotificationLogEntity();

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.status = domainEntity.status;
    persistenceEntity.channel = domainEntity.channel;
    persistenceEntity.errorMessage = domainEntity.errorMessage ?? null;

    if (domainEntity.notificationId) {
      const notificationEntity = new NotificationEntity();
      notificationEntity.id = domainEntity.notificationId;
      persistenceEntity.notification = notificationEntity;
    }

    return persistenceEntity;
  }
}

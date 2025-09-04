import { Notification } from '../../../../domain/notification';
import { NotificationEntity } from '../entities/notifications.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { PlantEntity } from '../../../../../plants/infrastructure/persistence/relational/entities/plants.entity';

export class NotificationMapper {
  static toDomain(raw: NotificationEntity): Notification {
    const domainEntity = new Notification();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.type = raw.type;
    domainEntity.payload = raw.payload;
    domainEntity.url = raw.url;
    domainEntity.isRead = raw.isRead;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    domainEntity.userId = raw.user?.id;
    domainEntity.plantId = raw.plant?.id;

    return domainEntity;
  }

  static toPersistence(domainEntity: Notification): NotificationEntity {
    const persistenceEntity = new NotificationEntity();

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.title = domainEntity.title;
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.payload = domainEntity.payload;
    persistenceEntity.url = domainEntity.url;
    persistenceEntity.isRead = domainEntity.isRead ?? false;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    if (domainEntity.userId) {
      const userEntity = new UserEntity();
      userEntity.id = domainEntity.userId;
      persistenceEntity.user = userEntity;
    }

    if (domainEntity.plantId) {
      const plantEntity = new PlantEntity();
      plantEntity.id = domainEntity.plantId;
      persistenceEntity.plant = plantEntity;
    }

    return persistenceEntity;
  }
}

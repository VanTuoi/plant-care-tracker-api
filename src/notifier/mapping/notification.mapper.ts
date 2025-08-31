import { Notification } from '../domain/entities/notification.entity';
import { MailNotificationDto } from '../dto/create-mail-notification.dto';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationResponseDto } from '../dto/notification-response.dto';
import { NotificationOrmEntity } from '../infrastructure/persistence/notification.entity';
import { NotificationPriority } from '../constants/notifier.constants';

export class NotificationMapper {
  static toDomain(orm: NotificationOrmEntity): Notification {
    return new Notification(
      orm.id,
      orm.userId,
      orm.email ?? null,
      orm.title,
      orm.message,
      orm.payload,
      orm.priority,
      orm.createdAt,
    );
  }

  static toOrmEntity(domain: Notification): NotificationOrmEntity {
    const orm = new NotificationOrmEntity();
    orm.id = domain.id;
    orm.userId = domain.userId;
    orm.email = domain.email ?? null;
    orm.title = domain.title;
    orm.message = domain.message;
    orm.payload = domain.payload ?? {};
    orm.priority = domain.priority ?? NotificationPriority.NORMAL;
    orm.createdAt = domain.createdAt;
    return orm;
  }

  static toResponseDto(domain: Notification): NotificationResponseDto {
    return {
      id: domain.id,
      userId: domain.userId,
      email: domain.email ?? null,
      title: domain.title,
      message: domain.message,
      payload: domain.payload ?? {},
      priority: domain.priority,
      createdAt: domain.createdAt,
    };
  }

  static fromCreateDto(dto: CreateNotificationDto): Notification {
    return new Notification(
      crypto.randomUUID(),
      dto.userId,
      dto.email ?? null,
      dto.title,
      dto.message,
      dto.payload ?? null,
      dto.priority ?? NotificationPriority.NORMAL,
      new Date(),
    );
  }

  static fromMailDto(dto: MailNotificationDto): Notification {
    return new Notification(
      crypto.randomUUID(),
      '',
      dto.to ?? null,
      dto.subject ?? '',
      dto.text ?? dto.html ?? '',
      dto.context ?? null,
      dto.priority ?? NotificationPriority.NORMAL,
      new Date(),
    );
  }
}

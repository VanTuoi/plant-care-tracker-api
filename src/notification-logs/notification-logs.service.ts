import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NotificationLog } from './domain/notification-log';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';
import { NullableType } from '../utils/types/nullable.type';
import { NotificationRepository } from '../notifications/infrastructure/persistence/notification.repository';
import { NotificationLogRepository } from './infrastructure/persistence/notification-logs.repository';

@Injectable()
export class NotificationLogsService {
  constructor(
    private readonly notificationLogRepository: NotificationLogRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}
  async create(dto: CreateNotificationLogDto): Promise<NotificationLog> {
    const notification = await this.notificationRepository.findById(
      dto.notificationId,
    );
    if (!notification) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { notification: 'notificationNotExists' },
      });
    }

    return this.notificationLogRepository.create(dto);
  }

  async findAll(): Promise<NotificationLog[]> {
    return this.notificationLogRepository.findAll();
  }

  async findById(
    id: NotificationLog['id'],
  ): Promise<NullableType<NotificationLog>> {
    return this.notificationLogRepository.findById(id);
  }

  async update(
    id: NotificationLog['id'],
    dto: UpdateNotificationLogDto,
  ): Promise<NotificationLog | null> {
    const log = await this.notificationLogRepository.findById(id);
    if (!log)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { log: 'notificationLogNotExists' },
      });

    return this.notificationLogRepository.update(id, dto);
  }
}

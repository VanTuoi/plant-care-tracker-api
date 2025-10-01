import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Notification } from './domain/notification';
import { NullableType } from '../utils/types/nullable.type';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UsersService } from '../users/users.service';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { RoleEnum } from '../roles/roles.enum';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationRepository,
    private readonly userService: UsersService,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
    jwt: JwtPayloadType,
  ): Promise<Notification> {
    const userId =
      jwt.role?.id === RoleEnum.admin && createNotificationDto.userId
        ? createNotificationDto.userId
        : jwt.id;

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'userNotExists' },
      });
    }

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== user.id) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotCreateNotificationForAnotherUser' },
      });
    }

    const notificationData: Omit<
      Notification,
      'id' | 'createdAt' | 'updatedAt'
    > = {
      ...createNotificationDto,
      userId: user.id,
      isRead: createNotificationDto.isRead ?? false,
    };

    return this.notificationsRepository.create(notificationData);
  }

  async createInternal(
    createNotificationDto: Required<CreateNotificationDto>,
  ): Promise<Notification> {
    const user = await this.userService.findById(createNotificationDto.userId);
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { user: 'userNotExists' },
      });
    }

    const notificationData: Omit<
      Notification,
      'id' | 'createdAt' | 'updatedAt'
    > = {
      ...createNotificationDto,
      isRead: createNotificationDto.isRead ?? false,
    };

    return this.notificationsRepository.create(notificationData);
  }

  async findAll(jwt: JwtPayloadType): Promise<Notification[]> {
    if (jwt.role?.id === RoleEnum.admin) {
      return this.notificationsRepository.findAll();
    }

    return await this.notificationsRepository.findByUserId(jwt.id);
  }

  async findById(
    id: Notification['id'],
    jwt: JwtPayloadType,
  ): Promise<NullableType<Notification>> {
    const notification = await this.notificationsRepository.findById(id);

    if (!notification)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { notification: 'notificationNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== notification.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotAccessNotificationOfAnotherUser' },
      });
    }

    return notification;
  }

  findByIds(ids: Notification['id'][]): Promise<Notification[]> {
    return this.notificationsRepository.findByIds(ids);
  }

  async update(
    id: Notification['id'],
    updateNotificationDto: UpdateNotificationDto,
    jwt: JwtPayloadType,
  ): Promise<Notification | null> {
    const notification = await this.notificationsRepository.findById(id);

    if (!notification)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { notification: 'notificationNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== notification.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotUpdateNotificationOfAnotherUser' },
      });
    }

    return this.notificationsRepository.update(id, {
      ...updateNotificationDto,
      userId: notification.userId,
    });
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.findByUserId(userId);
  }
}

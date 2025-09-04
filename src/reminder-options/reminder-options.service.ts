import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ReminderOptionRepository } from './infrastructure/persistence/reminder-option.repository';
import { ReminderOption } from './domain/reminder-option';
import { NullableType } from '../utils/types/nullable.type';
import { JwtPayloadType } from '../common/types/jwt-payload.type';
import { RoleEnum } from '../roles/roles.enum';
import { CreateReminderOptionDto } from './dto/create-reminder-option.dto';
import { UpdateReminderOptionDto } from './dto/update-reminder-option.dto';
import { Channel, ReminderPriority, SendMode } from './reminder-options.enum';

@Injectable()
export class ReminderOptionsService {
  constructor(
    private readonly reminderOptionRepository: ReminderOptionRepository,
  ) {}

  async create(
    dto: CreateReminderOptionDto,
    jwt: JwtPayloadType,
  ): Promise<ReminderOption> {
    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== dto.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotCreateReminderOptionForAnotherUser' },
      });
    }

    const existing = await this.reminderOptionRepository.findByUserId(
      dto.userId,
    );
    if (existing.length > 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { reminderOption: 'userAlreadyHasReminderOption' },
      });
    }

    return this.reminderOptionRepository.create(dto);
  }

  async createForUser(
    dto: Partial<CreateReminderOptionDto> & { userId: string },
  ): Promise<ReminderOption> {
    const payload: CreateReminderOptionDto = {
      isEnabled: dto.isEnabled ?? true,
      sendMode: dto.sendMode ?? SendMode.FIXED_TIME,
      priority: dto.priority ?? ReminderPriority.MEDIUM,
      channels: dto.channels ?? [Channel.EMAIL],
      userId: dto.userId,
      startTime: dto.startTime,
      endTime: dto.endTime,
    };

    return this.reminderOptionRepository.create(payload);
  }

  async findById(
    id: ReminderOption['id'],
    jwt: JwtPayloadType,
  ): Promise<NullableType<ReminderOption>> {
    const option = await this.reminderOptionRepository.findById(id);
    if (!option)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { reminderOption: 'reminderOptionNotExists' },
      });

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== option.userId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotFindReminderOptionOfAnotherUser' },
      });
    }

    return option;
  }

  async findByUserId(
    jwt: JwtPayloadType,
    userId?: ReminderOption['userId'],
  ): Promise<ReminderOption[]> {
    const targetUserId = userId ?? jwt.id;

    if (!targetUserId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { userId: 'userIdRequired' },
      });
    }

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== targetUserId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotFindReminderOptionOfAnotherUser' },
      });
    }

    return this.reminderOptionRepository.findByUserId(targetUserId);
  }

  async updateByUserId(
    jwt: JwtPayloadType,
    userId: ReminderOption['userId'] | undefined,
    dto: UpdateReminderOptionDto,
  ): Promise<ReminderOption | null> {
    const targetUserId = userId ?? jwt.id;

    if (!targetUserId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { userId: 'userIdRequired' },
      });
    }

    if (jwt.role?.id !== RoleEnum.admin && jwt.id !== targetUserId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        errors: { user: 'cannotUpdateReminderOptionOfAnotherUser' },
      });
    }

    const existing =
      await this.reminderOptionRepository.findByUserId(targetUserId);
    if (existing.length === 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { reminderOption: 'reminderOptionNotExists' },
      });
    }

    return this.reminderOptionRepository.update(existing[0].id, dto);
  }
}

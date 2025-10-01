import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Channel,
  ReminderPriority,
  SendMode,
} from '../../../../reminder-options/reminder-options.enum';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { ReminderOptionEntity } from '../../../../reminder-options/infrastructure/persistence/relational/entities/reminder-option.entity';

@Injectable()
export class ReminderOptionSeedService {
  constructor(
    @InjectRepository(ReminderOptionEntity)
    private readonly reminderOptionRepo: Repository<ReminderOptionEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async run() {
    const users = await this.userRepo.find();

    for (const user of users) {
      const existing = await this.reminderOptionRepo.findOne({
        where: { userId: user.id },
      });

      if (!existing) {
        await this.reminderOptionRepo.save(
          this.reminderOptionRepo.create({
            userId: user.id,
            isEnabled: true,
            sendMode: SendMode.FIXED_TIME,
            priority: ReminderPriority.MEDIUM,
            channels: [Channel.SOCKET, Channel.EMAIL],
            startTime: '08:00',
            endTime: '20:00',
          }),
        );
      }
    }
  }
}

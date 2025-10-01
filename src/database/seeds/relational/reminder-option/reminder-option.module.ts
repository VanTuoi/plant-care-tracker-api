import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReminderOptionSeedService } from './reminder-option-seed.service';
import { ReminderOptionEntity } from '../../../../reminder-options/infrastructure/persistence/relational/entities/reminder-option.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReminderOptionEntity, UserEntity])],
  providers: [ReminderOptionSeedService],
  exports: [ReminderOptionSeedService],
})
export class ReminderOptionSeedModule {}

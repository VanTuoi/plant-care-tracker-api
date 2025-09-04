import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReminderOptionRepository } from '../reminder-option.repository';
import { ReminderOptionsRelationalRepository } from './repositories/reminder-option.repository';
import { ReminderOptionEntity } from './entities/reminder-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReminderOptionEntity])],
  providers: [
    {
      provide: ReminderOptionRepository,
      useClass: ReminderOptionsRelationalRepository,
    },
  ],
  exports: [ReminderOptionRepository],
})
export class RelationalReminderOptionPersistenceModule {}

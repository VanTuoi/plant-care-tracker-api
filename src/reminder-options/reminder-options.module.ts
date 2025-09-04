import { Module } from '@nestjs/common';

import { ReminderOptionsController } from './reminder-options.controller';
import { ReminderOptionsService } from './reminder-options.service';
import { RelationalReminderOptionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule =
  RelationalReminderOptionPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [ReminderOptionsController],
  providers: [ReminderOptionsService],
  exports: [ReminderOptionsService, infrastructurePersistenceModule],
})
export class ReminderOptionsModule {}

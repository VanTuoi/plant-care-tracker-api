import { Module } from '@nestjs/common';
import { CalendarReminderController } from './calendar-reminder.controller';
import { NotifierModule } from '../notifier/notifier.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [NotifierModule, MailModule],
  controllers: [CalendarReminderController],
})
export class CalendarReminderModule {}

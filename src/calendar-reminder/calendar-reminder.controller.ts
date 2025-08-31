import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MailService } from '../mail/mail.service';

@ApiTags('Calendar Reminder')
@Controller({
  path: 'calendar-reminder',
  version: '1',
})
export class CalendarReminderController {
  constructor(private readonly mail: MailService) {}

  @Post('notify-plant')
  @ApiOperation({ summary: 'Gửi email nhắc lịch tưới cây' })
  async notifyPlant() {
    await this.mail.plantWateringReminder();
    return { status: 'sent' };
  }
}

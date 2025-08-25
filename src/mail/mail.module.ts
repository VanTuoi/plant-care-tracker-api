import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { NotifierModule } from '../notifier/notifier.module';

@Module({
  imports: [ConfigModule, NotifierModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

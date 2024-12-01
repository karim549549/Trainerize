import { Module } from '@nestjs/common';
import { EmailSender } from './emailsender.service';
import { EmailFactory } from './factories/email.factory';

@Module({
  providers: [EmailSender , EmailFactory],
  exports: [EmailSender , EmailFactory],
})
export class EmailsenderModule {}

import { Module } from '@nestjs/common';

import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './services/messages/messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class ApiMessagesModule {}

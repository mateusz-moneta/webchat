import { Module } from '@nestjs/common';

import { ConversationsController } from './conversations/conversations.controller';
import { ConversationsService } from './services/conversations/conversations.service';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ApiConversationsModule {}

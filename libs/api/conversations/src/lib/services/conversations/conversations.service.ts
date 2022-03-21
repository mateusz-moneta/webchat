import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { Conversation } from '@webchat/api/database';
import { ConversationDto } from '../../dto/conversation.dto';
import { CreateConversationDto } from '../../dto/create-conversation.dto';

@Injectable()
export class ConversationsService {
  async createConversation(createConversationDto: CreateConversationDto): Promise<ConversationDto> {
    const conversation = new Conversation({
      ...createConversationDto,
      users: createConversationDto.users.join(', ')
    });

    const record = await conversation.save();

    return new ConversationDto({
      ...record,
      users: record.users.split(', ').map(userId => parseInt(userId, 10))
    });
  }

  async getConversations(): Promise<ConversationDto[]> {
    const conversations = await getConnection()
      .createQueryBuilder()
      .select(["id", "name", "users"])
      .from(Conversation, "conversation")
      .getRawMany();

    return conversations.map(conversation => ({
      ...conversation,
      users: conversation.users.split(', ').map(userId => parseInt(userId, 10))
    }));
  }
}

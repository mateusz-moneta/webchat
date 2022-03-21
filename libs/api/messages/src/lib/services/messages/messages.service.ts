import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { Conversation, Message, User } from '@webchat/api/database';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { ListMessagesDto } from '../../dto/list-messages.dto';
import { MessageDto } from '../../dto/message.dto';

@Injectable()
export class MessagesService {
  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    const message = new Message(createMessageDto);
    message.author = new User({ id: createMessageDto.authorId });
    message.conversation = new Conversation({ id: createMessageDto.conversationId });
    const { id } = await message.save();

    return await getConnection()
      .createQueryBuilder()
      .select("content")
      .addSelect("message.created_at", "created_at")
      .addSelect("message.updated_at", "updated_at")
      .addSelect("author.username", "author")
      .innerJoin(User, "author", "author.id = message.authorId")
      .where("message.id = :id", { id })
      .from(Message, "message")
      .getRawOne();
  }

  async deleteMessage(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where("id = :id", { id })
      .execute();
  }

  async getMessages({ conversationId }: ListMessagesDto): Promise<MessageDto[]> {
    return await getConnection()
      .createQueryBuilder()
      .select("content")
      .addSelect("message.created_at", "created_at")
      .addSelect("message.updated_at", "updated_at")
      .addSelect("author.username", "author")
      .innerJoin(User, "author", "author.id = message.authorId")
      .where("message.conversationId = :conversationId", { conversationId })
      .from(Message, "message")
      .getRawMany();
  }
}

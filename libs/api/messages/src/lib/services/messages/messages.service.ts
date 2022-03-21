import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { Message } from '@webchat/api/database';
import { MessageDto } from '../../dto/message.dto';

@Injectable()
export class MessagesService {
  async getMessages(): Promise<MessageDto[]> {
    return await getConnection()
      .createQueryBuilder()
      .select(["id", "content", "created_at", "updated_at"])
      .from(Message, "message")
      .getRawMany();
  }
}

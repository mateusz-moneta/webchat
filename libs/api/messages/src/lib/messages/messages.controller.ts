import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MessageDto } from '../dto/message.dto';
import { MessagesService } from '../services/messages/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiTags('messages')
  @ApiResponse({
    type: MessageDto,
    isArray: true,
    status: 200
  })
  @Get()
  async getMessages(): Promise<MessageDto[]> {
    return await this.messagesService.getMessages();
  }
}

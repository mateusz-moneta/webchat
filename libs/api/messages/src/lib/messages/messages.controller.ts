import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMessageDto } from '../dto/create-message.dto';
import { ListMessagesDto } from '../dto/list-messages.dto';
import { MessageDto } from '../dto/message.dto';
import { MessagesService } from '../services/messages/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiTags('messages')
  @ApiResponse({
    type: MessageDto,
    status: 201
  })
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<MessageDto> {
    return await this.messagesService.createMessage(createMessageDto);
  }

  @ApiTags('messages')
  @ApiResponse({
    type: MessageDto,
    isArray: true,
    status: 200
  })
  @HttpCode(202)
  @Delete(':id')
  async deleteMessage(@Param('id') id: number): Promise<void> {
    return await this.messagesService.deleteMessage(id);
  }

  @ApiTags('messages')
  @ApiResponse({
    type: MessageDto,
    isArray: true,
    status: 200
  })
  @Get()
  async getMessages(@Query() query: ListMessagesDto): Promise<MessageDto[]> {
    return await this.messagesService.getMessages(query);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ConversationDto } from '../dto/conversation.dto';
import { ConversationsService } from '../services/conversations/conversations.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @ApiTags('conversations')
  @ApiResponse({
    type: ConversationDto,
    status: 201
  })
  @Post()
  async createConversation(@Body() createConversationDto: CreateConversationDto): Promise<ConversationDto> {
    return await this.conversationsService.createConversation(createConversationDto);
  }

  @ApiTags('conversations')
  @ApiResponse({
    type: ConversationDto,
    isArray: true,
    status: 200
  })
  @Get()
  async getUsers(): Promise<ConversationDto[]> {
    return await this.conversationsService.getConversations();
  }
}

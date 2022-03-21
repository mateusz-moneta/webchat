import { Controller, Get } from '@nestjs/common';

import { UsersService } from '../services/users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@webchat/api/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiResponse({
    type: UserDto,
    isArray: true,
    status: 200
  })
  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.usersService.getUsers();
  }
}

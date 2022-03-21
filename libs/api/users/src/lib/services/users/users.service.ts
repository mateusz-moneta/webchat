import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { User } from '@webchat/api/database';
import { UserDto } from '@webchat/api/auth';

@Injectable()
export class UsersService {
  async getUsers(): Promise<UserDto[]> {
    return await getConnection()
      .createQueryBuilder()
      .select(["id", "username", "email"])
      .from(User, "user")
      .getRawMany();
  }
}

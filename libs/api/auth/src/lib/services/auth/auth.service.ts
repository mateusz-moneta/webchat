import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { UserDto } from '../../dto/user.dto';
import { User } from '@webchat/api/users-database';

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10

  async login({ password, username }: LoginDto): Promise<UserDto> {
    return await getConnection()
      .createQueryBuilder()
      .select(["id", "username", "email"])
      .from(User, "user")
      .where( {
        username,
        password: await bcrypt.hash(password, this.saltOrRounds)
      })
      .getRawOne();
  }

  async register(registerDto: RegisterDto): Promise<UserDto | Error> {
    const user = new User({
      ...registerDto,
      password: await bcrypt.hash(registerDto.password, this.saltOrRounds)
    });

    return await user.save();
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { UserDto } from '../../dto/user.dto';
import { User } from '@webchat/api/database';

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10

  async login({ password, username }: LoginDto): Promise<UserDto> {
    const user = await getConnection()
      .createQueryBuilder()
      .select(["id", "username", "email", "password"])
      .from(User, "user")
      .where( { username })
      .getRawOne();

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return user;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }

    return null;
  }

  async register(registerDto: RegisterDto): Promise<UserDto | Error> {
    const user = new User({
      ...registerDto,
      password: await bcrypt.hash(registerDto.password, this.saltOrRounds)
    });

    return await user.save();
  }
}

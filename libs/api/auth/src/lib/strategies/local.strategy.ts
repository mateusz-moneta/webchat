import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../services/auth/auth.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginDto: LoginDto): Promise<any> {
    const user = await this.authService.login(loginDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

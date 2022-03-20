import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from '../dto/auth-user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @ApiTags('auth')
  @ApiResponse({
    type: AuthUserDto,
    status: 201
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthUserDto> {
    const payload = await this.authService.login(loginDto);

    return {
      ...payload,
      accessToken: this.jwtService.sign(payload)
    };
  }

  @ApiTags('auth')
  @ApiResponse({
    type: UserDto,
    status: 201
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto | Error> {
    return await this.authService.register(registerDto);
  }
}

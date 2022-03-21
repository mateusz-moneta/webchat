import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth/auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserDto } from '../dto/user.dto';
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard';

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

    try {
      const accessToken = this.jwtService.sign(payload);

      return new AuthUserDto({
        ...payload,
        accessToken
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
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

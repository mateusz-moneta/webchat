import { Body, Controller, HttpCode, Post, Put, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth/auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserDto } from '../dto/user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @ApiTags('auth')
  @ApiResponse({
    type: UserDto,
    status: 204
  })
  @HttpCode(204)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<void> {
    return await this.authService.changePassword(changePasswordDto);
  }

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

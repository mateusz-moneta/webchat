import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class ApiAuthModule {}

import { Module } from '@nestjs/common';
import { JwtStrategy } from '../../common/strategy/index.js';
import { TokenModule } from '../token/token.module.js';
import { UserModule } from '../user/user.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
  controllers: [AuthController],
  imports: [UserModule, TokenModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module.js';
import { TokenService } from './token.service.js';

@Module({
  imports: [UserModule],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}

import { Module } from '@nestjs/common';
import { JwtStrategy } from '../../common/strategy/index.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthRepository } from './repositories/auth.repository.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, AuthRepository],
})
export class AuthModule {}

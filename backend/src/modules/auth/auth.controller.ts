import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-guard.js';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor.js';
import { TokenService } from '../token/token.service.js';
import { CreateUserDto } from '../user/dto/user-create.dto.js';
import { UserResponse } from '../user/types/index.js';
import { AuthService } from './auth.service.js';
import { UserLoginDto } from './dto/user-login.dto.js';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'Статус присваивается при успешной регистрации!',
  })
  async registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponse> {
    return await this.authService.register(dto, res);
  }

  @Post('/login')
  async login(
    @Body() dto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(dto, res);
  }

  @Get('/user')
  async getUser(@Req() req: Request) {
    return await this.tokenService.getUser(req);
  }

  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.tokenService.refresh(req, res);
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.tokenService.logout(res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/test')
  async test() {
    return true;
  }
}

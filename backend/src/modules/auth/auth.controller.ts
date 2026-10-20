import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegistrationUserDto } from './dto/registration.dto.js';
import { UserResponse } from './types/index.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registration(@Body() dto: RegistrationUserDto): Promise<UserResponse> {
    return await this.authService.register(dto);
  }
}

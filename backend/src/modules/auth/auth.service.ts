import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegistrationUserDto } from './dto/registration.dto.js';
import { AuthRepository } from './repositories/auth.repository.js';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(dto: RegistrationUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return await this.authRepository.register({
      ...dto,
      password: passwordHash,
    });
  }
}

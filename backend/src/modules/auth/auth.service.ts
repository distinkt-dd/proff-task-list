import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import { ErrorsConstants } from '../../common/constants/errors.constants.js';
import { TokenService } from '../token/token.service.js';
import { CreateUserDto } from '../user/dto/user-create.dto.js';
import { UserRepository } from '../user/repositories/user.repository.js';
import { UserResponse } from '../user/types/index.js';
import { UserService } from '../user/user.service.js';
import { UserLoginDto } from './dto/user-login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: CreateUserDto, res: Response): Promise<UserResponse> {
    const user = await this.userService.createUser(dto);
    return this.tokenService.auth(res, user);
  }

  async login(dto: UserLoginDto, res: Response): Promise<UserResponse> {
    const existUser = await this.userRepository.findByEmail(dto.email);
    if (!existUser)
      throw new BadRequestException(ErrorsConstants.USER_NOT_EXISTS);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) {
      throw new BadRequestException(ErrorsConstants.WRONG_DATA);
    }

    return this.tokenService.auth(res, existUser);
  }
}

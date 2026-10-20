import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ErrorsConstants } from '../../common/constants/errors.constants.js';
import { CreateUserDto } from './dto/user-create.dto.js';
import { UserRepository } from './repositories/user.repository.js';
import { TPublicUser } from './types/index.js';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async __hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(dto: CreateUserDto): Promise<TPublicUser> {
    const existUser = await this.userRepository.findByEmail(dto.email);
    if (existUser) throw new BadRequestException(ErrorsConstants.USER_EXISTS);
    const newUser = Object.assign({}, dto);
    newUser.password = await this.__hashPassword(newUser.password);
    return await this.userRepository.create(newUser);
  }
}

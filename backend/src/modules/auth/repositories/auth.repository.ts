import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { TUserForRegister, UserResponse } from '../types/index.js';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private async findByEmail(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new BadRequestException('Email уже занят!');
    }

    return true;
  }

  async register(dataForRegister: TUserForRegister): Promise<UserResponse> {
    await this.findByEmail(dataForRegister.email);
    return await this.prismaService.user.create({
      data: {
        ...dataForRegister,
      },
      select: {
        name: true,
        email: true,
        tasks: true,
      },
    });
  }
}

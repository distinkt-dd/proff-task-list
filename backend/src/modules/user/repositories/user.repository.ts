import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import type { TPublicUser, TUser, TUserForRegister } from '../types/index.js';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<TUser | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        tasks: true,
      },
    });

    if (user) {
      return user;
    }
    return null;
  }

  async create(dataForRegister: TUserForRegister): Promise<TPublicUser> {
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

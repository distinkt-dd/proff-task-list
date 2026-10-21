import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { ErrorsConstants } from '../../common/constants/errors.constants.js';
import { JwtPayload } from '../../common/strategy/types.js';
import { UserRepository } from '../user/repositories/user.repository.js';
import { TPublicUser, TTokens, UserResponse } from '../user/types/index.js';

@Injectable()
export class TokenService {
  private readonly COOKIE_DOMAIN: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  private sign(
    payload: { email: string },
    secretKey: string,
    expireKey: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>(secretKey),
      expiresIn: this.configService.getOrThrow(expireKey),
    });
  }

  private setCookie(res: Response, value: string, exp: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      expires: exp,
      secure: false,
      sameSite: 'lax',
    });
  }

  async accessAndRefreshTokensGenerate(email: string): Promise<TTokens> {
    return {
      accessToken: this.sign({ email }, 'SECRET_JWT', 'EXPIRE_JWT'),
      refreshToken: this.sign(
        { email },
        'SECRET_REFRESH_JWT',
        'EXPIRE_REFRESH_JWT',
      ),
    };
  }

  async auth(res: Response, user: TPublicUser): Promise<UserResponse> {
    const { accessToken, refreshToken } =
      await this.accessAndRefreshTokensGenerate(user.email);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    );

    return {
      name: user.name,
      email: user.email,
      tasks: user.tasks,
      accessToken: accessToken,
    };
  }

  async refresh(
    req: Request,
    res: Response,
  ): Promise<Omit<TTokens, 'refreshToken'> | undefined> {
    try {
      const refreshToken = req.cookies?.['refreshToken'];
      if (!refreshToken) {
        throw new UnauthorizedException(ErrorsConstants.UNAUTHORIZED);
      }

      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>('SECRET_REFRESH_JWT'),
        },
      );

      if (payload) {
        const user = await this.userRepository.findByEmail(payload.email);
        if (!user) {
          throw new BadRequestException(ErrorsConstants.USER_NOT_EXISTS);
        }
        const { password, ...otherUser } = user;

        const { accessToken, refreshToken } =
          await this.accessAndRefreshTokensGenerate(otherUser.email);

        this.setCookie(
          res,
          refreshToken,
          new Date(Date.now() + 24 * 60 * 60 * 1000),
        );

        return {
          accessToken,
        };
      }
    } catch (err) {
      throw new UnauthorizedException(ErrorsConstants.UNAUTHORIZED);
    }
  }

  async getUser(req: Request): Promise<TPublicUser | undefined> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(ErrorsConstants.UNAUTHORIZED);
      }

      const accessToken = authHeader.split(' ')[1];

      const payload: JwtPayload = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret: this.configService.getOrThrow<string>('SECRET_JWT'),
        },
      );

      if (payload) {
        const user = await this.userRepository.findByEmail(payload.email);
        if (!user) {
          throw new BadRequestException(ErrorsConstants.USER_NOT_EXISTS);
        }
        const { password, ...otherUser } = user;

        return otherUser;
      }
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(ErrorsConstants.UNAUTHORIZED);
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
    return true;
  }
}

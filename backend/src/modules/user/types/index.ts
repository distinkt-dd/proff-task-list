import { Task } from '@prisma/client';

export type TUserForRegister = {
  name: string;
  email: string;
  password: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  tasks: Task[];
};

export type TPublicUser = Omit<TUser, 'password'>;

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = TPublicUser & Omit<TTokens, 'refreshToken'>;

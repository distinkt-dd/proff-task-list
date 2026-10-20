import { Task } from '@prisma/client';

export type TUserForRegister = {
  name: string;
  email: string;
  password: string;
};

export type UserResponse = {
  name: string;
  email: string;
  tasks: Task[];
};

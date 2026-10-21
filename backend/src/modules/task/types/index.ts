import { Prisma } from '@prisma/client';

export const taskSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
} satisfies Prisma.TaskSelect;

export type TaskResponse = Prisma.TaskGetPayload<{ select: typeof taskSelect }>;

export type PaginatedTaskResponse = {
  items: TaskResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

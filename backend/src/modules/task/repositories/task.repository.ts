import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ErrorsConstants } from '../../../common/constants/errors.constants.js';
import { PaginationDto } from '../../../common/dtos/pagination.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateTaskDto } from '../dto/create-task.dto.js';
import {
  PaginatedTaskResponse,
  TaskResponse,
  taskSelect,
} from '../types/index.js';

@Injectable()
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private async findOneOrThrow(
    taskId: string,
    userId: string,
  ): Promise<TaskResponse> {
    const task = await this.prismaService.task.findFirst({
      where: { id: taskId, userId, deletedAt: null },
      select: taskSelect,
    });

    if (!task) {
      throw new NotFoundException(ErrorsConstants.TASK_NOT_FOUND);
    }

    return task;
  }

  async create(dto: CreateTaskDto, userId: string): Promise<TaskResponse> {
    return await this.prismaService.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        userId,
      },
      select: taskSelect,
    });
  }

  async getOne(taskId: string, userId: string): Promise<TaskResponse> {
    return await this.findOneOrThrow(taskId, userId);
  }

  async getMany(
    userId: string,
    { page, limit, status, priority }: PaginationDto,
  ): Promise<PaginatedTaskResponse> {
    const where: Prisma.TaskWhereInput = {
      userId,
      deletedAt: null,
      ...(status && { status }),
      ...(priority && { priority }),
    };
    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.task.findMany({
        where,
        select: taskSelect,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prismaService.task.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async softDelete(taskId: string, userId: string): Promise<void> {
    await this.findOneOrThrow(taskId, userId);
    await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

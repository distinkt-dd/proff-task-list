import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dtos/pagination.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskRepository } from './repositories/task.repository.js';
import { PaginatedTaskResponse, TaskResponse } from './types/index.js';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  create(dto: CreateTaskDto, userId: string): Promise<TaskResponse> {
    return this.taskRepository.create(dto, userId);
  }

  getOne(taskId: string, userId: string): Promise<TaskResponse> {
    return this.taskRepository.getOne(taskId, userId);
  }

  getMany(
    userId: string,
    paginationOptions: PaginationDto,
  ): Promise<PaginatedTaskResponse> {
    return this.taskRepository.getMany(userId, paginationOptions);
  }

  softDelete(taskId: string, userId: string): Promise<void> {
    return this.taskRepository.softDelete(taskId, userId);
  }
}

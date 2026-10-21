import { Controller, Delete, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service.js';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  async createTask() {}

  @Get('/pagination')
  async getTasksOfPagination() {}

  @Get('/by-id/:id')
  async getTaskById() {}

  @Delete('/delete/:id')
  async deleteTask() {}
}

import { Module } from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository.js';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}

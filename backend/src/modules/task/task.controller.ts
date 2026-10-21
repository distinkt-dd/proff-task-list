import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { PaginationDto } from '../../common/dtos/pagination.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-guard.js';
import type { JwtPayload } from '../../common/strategy/types.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskService } from './task.service.js';
import { PaginatedTaskResponse, TaskResponse } from './types/index.js';
import {
  PaginatedTaskResponseClass,
  TaskResponseClass,
} from './types/task-response.class.js';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Создать задачу!' })
  @ApiCreatedResponse({
    description: 'Задача создана',
    type: TaskResponseClass,
  })
  @ApiUnauthorizedResponse({ description: 'Невалидный или отсутствующий JWT' })
  createTask(
    @Body() dto: CreateTaskDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<TaskResponse> {
    return this.taskService.create(dto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список задач с пагинацией и фильтрами' })
  @ApiOkResponse({
    description: 'Пагинированный список задач',
    type: PaginatedTaskResponseClass,
  })
  @ApiUnauthorizedResponse({
    description: 'Невалидный или отсутствующий JWT токен',
  })
  getTasksOfPagination(
    @Query() paginationOptions: PaginationDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<PaginatedTaskResponse> {
    return this.taskService.getMany(user.id, paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить задачу по ID' })
  @ApiOkResponse({ description: 'Найдена задача', type: TaskResponseClass })
  @ApiNotFoundResponse({
    description: 'Задача не найдена или принадлежит другому пользователю',
  })
  @ApiUnauthorizedResponse({
    description: 'Невалидный или отсутсвующий JWT',
  })
  getTaskById(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<TaskResponse> {
    return this.taskService.getOne(id, user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Мягко удалить задачу!' })
  @ApiNoContentResponse({ description: 'Задача помечена как удаленная' })
  @ApiNotFoundResponse({
    description: 'Задача не найдена или принадлежит другому пользователю',
  })
  @ApiUnauthorizedResponse({ description: 'Невалидный или отсутствующий JWT' })
  @Delete(':id')
  deleteTask(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    return this.taskService.softDelete(id, user.id);
  }
}

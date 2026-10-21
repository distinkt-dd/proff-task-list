import { PartialType } from '@nestjs/swagger';
import { StatusEnum } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto.js';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}

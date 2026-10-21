import { PriorityEnum } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой!' })
  @IsNotEmpty({ message: 'Название не может быть пустым!' })
  @MinLength(5, { message: 'Минимальное количество символов - 5!' })
  @MaxLength(50, { message: 'Максимальное количество символов - 50!' })
  title: string;

  @IsString({ message: 'Описание задачи должно быть строкой!' })
  @MinLength(10, { message: 'Минимальное количество символов - 10!' })
  @MaxLength(200, { message: 'Максимальное количество символов - 200!' })
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

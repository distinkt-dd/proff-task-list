import { PriorityEnum, StatusEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsInt({ message: 'Страница должна быть числом!' })
  @Min(1, { message: 'Минимальная страница для вывода - 1' })
  page: number = 1;

  @Type(() => Number)
  @IsInt({ message: 'Лимит должен быть числом!' })
  @Min(1, { message: 'Минимальное число задач: 1' })
  @Max(100, { message: 'Максимальное число задач: 100' })
  limit: number = 10;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;
}

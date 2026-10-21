import { IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber({}, { message: 'Страница должна быть числом!' })
  @Min(1, { message: 'Минимальная страница для вывода - 1' })
  page: number;

  @IsNumber({}, { message: 'Лимит должен быть числом!' })
  @Min(10, { message: 'Минимальное число задач: 10' })
  limit: number;
}

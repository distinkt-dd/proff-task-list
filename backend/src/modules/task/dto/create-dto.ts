import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Название задачи!',
    minLength: 5,
    maxLength: 50,
  })
  @IsString({ message: 'Название задачи должно быть строкой!' })
  @IsNotEmpty({ message: 'Название не может быть пустым!' })
  @MinLength(5, { message: 'Минимальное количество символов - 5!' })
  @MaxLength(50, { message: 'Максимальное количество символов - 50!' })
  title: string;

  @ApiProperty({
    description: 'Описание задачи!',
    minLength: 10,
    maxLength: 200,
  })
  @IsString({ message: 'Описание задачи должно быть строкой!' })
  @MinLength(10, { message: 'Минимальное количество символов - 10!' })
  @MaxLength(200, { message: 'Максимальное количество символов - 200!' })
  @IsOptional()
  description?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'Почта пользователя!',
    minLength: 4,
    maxLength: 200,
    type: String,
  })
  @IsString({ message: 'email должен быть строкой' })
  @IsEmail({}, { message: 'Введенное значение не является email!' })
  @MinLength(4, { message: 'Минимальная длина email 4 символов!' })
  @MaxLength(200, { message: 'Максимальная длина пароля 200 симоволов!' })
  @IsNotEmpty({ message: 'Email не может быть пустым!' })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    minLength: 8,
    maxLength: 50,
    type: String,
  })
  @IsString({ message: 'Пароль должен быть строкой!' })
  @MinLength(8, { message: 'Минимальная длина пароля 8 символов!' })
  @MaxLength(50, { message: 'Максимальная длина пароля 50 симоволов!' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым!' })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsString({ message: 'email должен быть строкой' })
  @IsEmail({}, { message: 'Введенное значение не является email!' })
  @MinLength(4, { message: 'Минимальная длина email 4 символов!' })
  @MaxLength(200, { message: 'Максимальная длина пароля 200 симоволов!' })
  @IsNotEmpty({ message: 'Email не может быть пустым!' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Пароль должен быть строкой!' })
  @MinLength(8, { message: 'Минимальная длина пароля 8 символов!' })
  @MaxLength(50, { message: 'Максимальная длина пароля 50 симоволов!' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым!' })
  password: string;
}

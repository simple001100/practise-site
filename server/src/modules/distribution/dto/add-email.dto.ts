import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

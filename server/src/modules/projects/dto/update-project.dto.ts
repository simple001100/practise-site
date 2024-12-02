import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly photo: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsArray()
  readonly executors: string[];
}

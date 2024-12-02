import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePracticeDto {
  @IsNotEmpty()
  @IsString()
  readonly variant: string;

  @IsNotEmpty()
  @IsDateString()
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly endDate: Date;
}

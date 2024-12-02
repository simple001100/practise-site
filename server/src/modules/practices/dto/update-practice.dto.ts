import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePracticeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

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

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePracticeApplicationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly companyId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly practiceId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly count: number;
}

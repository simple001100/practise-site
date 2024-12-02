import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectApplicationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly companyId: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDateString()
  readonly endDate: Date;
}

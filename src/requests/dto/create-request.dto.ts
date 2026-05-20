import { IsString, IsNumber, Min } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  employeeId: string;

  @IsString()
  locationId: string;

  @IsNumber()
  @Min(0.5)
  days: number;
}
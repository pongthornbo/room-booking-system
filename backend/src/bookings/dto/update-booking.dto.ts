import {
  IsDateString,
  IsNotEmpty,
  IsInt,
  IsString,
  Min,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  roomId?: number;
}

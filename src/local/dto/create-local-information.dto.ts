import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateLocalInformationDto {
  @IsString()
  @Length(8, 8)
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @Length(2, 2)
  state: string;

  @IsString()
  @MinLength(3)
  address: string;

  @IsString()
  @IsOptional()
  complement?: string;
}

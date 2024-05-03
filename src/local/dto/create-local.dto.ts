import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateLocalInformationDto } from './create-local-information.dto';
import { CreateGateDto } from './create-gate.dto';

export class CreateLocalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @Length(14, 14)
  ein: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;

  @IsNumber()
  localtypeId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateLocalInformationDto)
  localInformation: CreateLocalInformationDto;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateGateDto)
  gates?: CreateGateDto[];
}

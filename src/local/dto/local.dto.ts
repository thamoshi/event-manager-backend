import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { LocalInformationDto } from './local-information.dto';
import { GateDto } from './gate.dto';

export class LocalDto {
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

  @IsInt()
  localTypeId: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => LocalInformationDto)
  localInformation: LocalInformationDto;

  @IsArray()
  @ValidateNested()
  @Type(() => GateDto)
  gates?: GateDto[];
}

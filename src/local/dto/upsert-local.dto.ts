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
import { UpsertLocalInformationDto } from './upsert-local-information.dto';
import { UpsertGateDto } from './upsert-gate.dto';

export class UpsertLocalDto {
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
  @Type(() => UpsertLocalInformationDto)
  localInformation: UpsertLocalInformationDto;

  @IsArray()
  @ValidateNested()
  @Type(() => UpsertGateDto)
  gates?: UpsertGateDto[];
}

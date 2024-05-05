import {
  IsDateString,
  IsEmail,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';
import { TimeStringValidator } from 'src/utils/validators/time.validator';

export class EventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  eventTypeId: number;

  @IsDateString()
  @IsISO8601()
  eventDate: Date;

  @IsString()
  @Validate(TimeStringValidator)
  eventTime: string;

  @IsInt()
  localId: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;
}

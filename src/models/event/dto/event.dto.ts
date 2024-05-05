import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Final Copa', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, required: true })
  @IsInt()
  eventTypeId: number;

  @ApiProperty({ example: '2024-05-06', required: true })
  @IsDateString()
  @IsISO8601()
  eventDate: Date;

  @ApiProperty({ example: '1200', required: true })
  @IsString()
  @Validate(TimeStringValidator)
  eventTime: string;

  @ApiProperty({ example: 1, required: true })
  @IsInt()
  localId: number;

  @ApiProperty({ example: 'organizador@email.com', required: true })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11955555555', required: false })
  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;
}

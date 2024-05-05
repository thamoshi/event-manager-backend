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
import { ApiProperty } from '@nestjs/swagger';

export class LocalDto {
  @ApiProperty({ example: 'Estádio Morumbi', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'MorumBis', required: false })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({ example: '00000000000000', required: true })
  @IsString()
  @Length(14, 14)
  ein: string;

  @ApiProperty({ example: 'estadio.morumbi@email.com', required: true })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11912344321', required: false })
  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;

  @ApiProperty({ example: 1, required: true })
  @IsInt()
  localTypeId: number;

  @ApiProperty({
    example: {
      zipCode: '00000000',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua Endereco, 123',
    },
    required: true,
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => LocalInformationDto)
  localInformation: LocalInformationDto;

  @ApiProperty({
    example: [
      {
        name: 'A',
        isTicketGate: false,
      },
    ],
    required: false,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => GateDto)
  gates?: GateDto[];
}

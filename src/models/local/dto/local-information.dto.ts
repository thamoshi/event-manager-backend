import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class LocalInformationDto {
  @ApiProperty({ example: '0000000', required: true })
  @IsString()
  @Length(8, 8)
  zipCode: string;

  @ApiProperty({ example: 'Cidade', required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'AA', required: true })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: 'Rua Endereco, 123', required: true })
  @IsString()
  @MinLength(3)
  address: string;

  @ApiProperty({ example: 'Complemento', required: false })
  @IsString()
  @IsOptional()
  complement?: string;
}

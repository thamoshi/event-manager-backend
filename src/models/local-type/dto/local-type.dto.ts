import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LocalTypeDto {
  @ApiProperty({ example: 'Estádio' })
  @IsString()
  @MinLength(3)
  name: string;
}

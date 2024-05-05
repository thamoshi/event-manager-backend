import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EventTypeDto {
  @ApiProperty({ example: 'Futebol', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}

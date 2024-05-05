import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GateDto {
  @ApiProperty({ example: 'A', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'false', required: true })
  @IsBoolean()
  isTicketGate: boolean;
}

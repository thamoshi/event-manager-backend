import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isTicketGate: boolean;
}

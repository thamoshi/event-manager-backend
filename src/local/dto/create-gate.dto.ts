import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateGateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isTicketGate: boolean;
}

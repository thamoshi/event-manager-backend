import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpsertGateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isTicketGate: boolean;
}

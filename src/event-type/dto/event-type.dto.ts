import { IsNotEmpty, IsString } from 'class-validator';

export class EventTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

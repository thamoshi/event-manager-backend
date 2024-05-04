import { IsString, MinLength } from 'class-validator';

export class UpsertLocalTypeDto {
  @IsString()
  @MinLength(3)
  name: string;
}

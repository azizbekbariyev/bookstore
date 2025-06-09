import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  hashed_password: string;
}
import { IsEmail, IsOptional, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}

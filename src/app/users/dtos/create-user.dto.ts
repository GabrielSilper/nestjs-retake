import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  public readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}

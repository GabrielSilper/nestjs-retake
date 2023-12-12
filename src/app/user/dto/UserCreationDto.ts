import { IsEmail, IsNotEmpty } from 'class-validator';

export default class UserCreationDto {
  @IsNotEmpty()
  public readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;
  @IsNotEmpty()
  public readonly password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

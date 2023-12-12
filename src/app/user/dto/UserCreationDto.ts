import { UserEntity } from '../user.entity';

export default class UserCreationDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  toUSer(): UserEntity {
    return new UserEntity();
  }
}

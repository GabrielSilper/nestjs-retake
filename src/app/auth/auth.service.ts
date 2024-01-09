import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload';
import { Token } from './types/token';
import IEncrypter from '../utils/encrypter/encrypter';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('Encrypter') private encrypter: IEncrypter,
  ) {}

  async singIn(email: string, password: string): Promise<Token> {
    const user = await this.usersService.getUserByEmail(email);
    const compare = await this.encrypter.compare(password, user.password);
    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: Payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}

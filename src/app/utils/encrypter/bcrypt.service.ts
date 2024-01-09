import { Injectable } from '@nestjs/common';
import IEncrypter from './encrypter';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IEncrypter {
  private readonly encrypter = bcrypt;

  async encrypt(password: string): Promise<string> {
    return await this.encrypter.hash(password, 10);
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return await this.encrypter.compare(password, hash);
  }
}

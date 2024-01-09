import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [
    {
      provide: 'Encrypter',
      useClass: BcryptService,
    },
  ],
  exports: ['Encrypter'],
})
export class EncrypterModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import UserEntity from './entities/user.entity';
import { EncrypterModule } from '../utils/encrypter/encrypter.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EncrypterModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

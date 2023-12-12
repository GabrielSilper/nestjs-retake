import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import UserCreationDto from './dto/UserCreationDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly mailRepository: Repository<UserEntity>,
  ) {}

  async save(newUser: UserCreationDto): Promise<UserEntity> {
    return await this.mailRepository.save({ ...newUser });
  }
}

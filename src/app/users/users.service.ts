import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}

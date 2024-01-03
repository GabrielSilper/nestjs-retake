import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';

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

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({
      where: { id },
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getUserById(id);
    await this.userRepository.update(id, { ...data });
    return { ...user, ...data };
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }
}

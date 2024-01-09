import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import IEncrypter from '../utils/encrypter/encrypter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject('Encrypter')
    private readonly encrypter: IEncrypter,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const hashedPass = await this.encrypter.encrypt(data.password);
    data.password = hashedPass;
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

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getUserById(id);
    if (data.password) {
      const hashedPass = await this.encrypter.encrypt(data.password);
      data.password = hashedPass;
    }
    await this.userRepository.update(id, { ...data });
    return { ...user, ...data };
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }
}

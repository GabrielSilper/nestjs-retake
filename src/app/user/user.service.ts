import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import UserCreationDto from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly mailRepository: Repository<UserEntity>,
  ) {}

  async save(newUser: UserCreationDto): Promise<UserEntity> {
    return await this.mailRepository.save({ ...newUser });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.mailRepository.findOneOrFail({
      where: { id },
    });
  }
}

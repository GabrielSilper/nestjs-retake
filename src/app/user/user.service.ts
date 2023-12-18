import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import UserCreationDto from './dto/create-user.dto';
import CreatePostDto from '../posts/dto/create-post.dto';
import PostEntity from '../posts/entities/post.entity';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly postService: PostsService,
  ) {}

  async save(newUser: UserCreationDto): Promise<UserEntity> {
    return await this.userRepository.save({ ...newUser });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({
      where: { id },
    });
  }

  async createPost(id: number, data: CreatePostDto): Promise<PostEntity> {
    const user = await this.findById(id);
    return await this.postService.createPost(user, data);
  }
}

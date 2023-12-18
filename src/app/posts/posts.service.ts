import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from './entities/post.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/create-post.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(user: UserEntity, data: CreatePostDto): Promise<PostEntity> {
    return await this.postRepository.save({ ...data, user });
  }
}

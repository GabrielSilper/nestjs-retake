import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import UserCreationDto from './dto/create-user.dto';
import { StatusCodes } from 'http-status-codes';
import CreatePostDto from '../posts/dto/create-post.dto';
import ResponsePostDto from '../posts/dto/response-post.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createUser(@Body() newUser: UserCreationDto): Promise<UserEntity> {
    return this.userService.save(newUser);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Post(':id/posts')
  @HttpCode(StatusCodes.CREATED)
  async createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreatePostDto,
  ): Promise<ResponsePostDto> {
    const post = await this.userService.createPost(id, data);
    return new ResponsePostDto(
      post.id,
      post.title,
      post.content,
      post.createdAt,
      post.updatedAt,
    );
  }

  @Get(':id/posts')
  async postsByUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponsePostDto[]> {
    return await this.userService.postsByUser(id);
  }
}

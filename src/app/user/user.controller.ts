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
}

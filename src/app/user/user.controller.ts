import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import UserCreationDto from './dto/UserCreationDto';
import { StatusCodes } from 'http-status-codes';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createUser(@Body() newUser: UserCreationDto): Promise<UserEntity> {
    return this.userService.save(newUser);
  }
}

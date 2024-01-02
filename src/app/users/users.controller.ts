import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/create-user.dto';
import ResponseUserDto from './dtos/response-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersService.createUser(data);
    return new ResponseUserDto(user.id, user.name, user.username, user.email);
  }
}

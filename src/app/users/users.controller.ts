import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/create-user.dto';
import ResponseUserDto from './dtos/response-user.dto';
import UpdateUserDto from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() data: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersService.createUser(data);
    return new ResponseUserDto(user.id, user.name, user.username, user.email);
  }

  @Get()
  async getAllUsers(): Promise<ResponseUserDto[]> {
    const users = await this.usersService.getAllUsers();
    return users.map(
      ({ id, name, username, email }) =>
        new ResponseUserDto(id, name, username, email),
    );
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseUserDto> {
    const user = await this.usersService.getUserById(id);
    return new ResponseUserDto(user.id, user.name, user.username, user.email);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.usersService.updateUser(id, data);
    return new ResponseUserDto(user.id, user.name, user.username, user.email);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './token';
import LoginDto from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async singIn(@Body() data: LoginDto): Promise<Token> {
    return await this.authService.singIn(data.email, data.password);
  }
}

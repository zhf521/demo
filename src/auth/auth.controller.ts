import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.auth.register(registerDto);
  }
  @Post('login')
  async login(@Body(new ValidationPipe()) LoginDto: LoginDto) {
    return this.auth.login(LoginDto);
  }
}

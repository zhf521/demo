import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // 依赖注入
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  // 注册服务
  async register(dto: RegisterDto) {
    // 存入数据库
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await argon2.hash(dto.password), // 对密码进行加密
      },
    });
    // payload 包含了用户的名称和标识（id）
    const payload = { name: user.name, sub: user.id };
    // 通过payload生成token
    let token = await this.jwtService.signAsync(payload);
    return { token };
  }
  // 登录服务
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (!(await argon2.verify(user.password, dto.password))) {
      throw new BadRequestException('密码错误');
    }
    // payload 包含了用户的名称和标识（id）
    const payload = { name: user.name, sub: user.id };
    // 通过payload生成token
    let token = await this.jwtService.signAsync(payload);
    return { token };
  }
}

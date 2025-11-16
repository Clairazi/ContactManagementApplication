// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersService.create(
      registerDto.email,
      registerDto.password,
      registerDto.role || 'user',
    );

    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      success: true,
      data: {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      success: true,
      data: {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }
}
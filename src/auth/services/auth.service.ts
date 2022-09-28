import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { LoginServiceResponse } from './auth.service.type';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneBy(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async login(email: string, password: string): Promise<LoginServiceResponse> {
    const user = await this.validateUser(email, password);
    if (user) {
      const payload = { username: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('email_or_password_wrong');
  }
}

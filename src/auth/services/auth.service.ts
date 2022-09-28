import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
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
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);
    if (user) {
      return {
        access_token: this.jwtService.sign({
          username: user.email,
          sub: user.id,
        }),
      };
    }
    throw new Error('email_or_password_wrong');
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    return this.userService.save(email, password).then((user) => {
      return {
        access_token: this.jwtService.sign({
          username: user.email,
          sub: user.id,
        }),
      };
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneBy(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async save(email: string, password: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      return this.usersRepository.save({
        email,
        password,
        firstName: '',
        lastName: '',
      });
    }

    throw 'user_with_this_email_already_exists';
  }
}

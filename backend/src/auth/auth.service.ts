import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { User } from 'src/users/user.model';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && compare(pass, user.password)) {
      const {password, ...result} = user
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expires: dayjs().add(3600, 's')
    };
  }

  async register(user: User) {
    const newUser = await this.usersService.createOne(user)
    const payload = { username: newUser.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      expires: dayjs().add(3600, 's')
    };
  }
}
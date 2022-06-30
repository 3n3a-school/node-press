import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { User } from 'src/users/user.model';
import { compare } from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && compare(pass, user.password)) {      
      const result: UserDto = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
      }    
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    console.log(`New Login from user ${user.username}`);
    
    const payload = { sub: user.id, username: user.username  };
    return {
      access_token: this.jwtService.sign(payload),
      expires: dayjs().add(3600, 's')
    };
  }

  async register(user: UserDto) {
    const newUser = await this.usersService.createOne(user)
    console.log(`New User with username ${newUser.username}`);
    
    
    const payload = {  sub: newUser.id, username: newUser.username }
    return {
      access_token: this.jwtService.sign(payload),
      expires: dayjs().add(3600, 's')
    };
  }
}
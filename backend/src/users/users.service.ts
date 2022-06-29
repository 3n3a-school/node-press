import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createOne(userDto: any): Promise<User> {
    const user = new User()
    user.username = userDto.username
    user.firstName = userDto.firstName
    user.lastName = userDto.lastName
    
    const salt = await genSalt(10)
    user.password = await hash(userDto.password, salt)

    const userData = await user.save()
    return userData
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-user.dto';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export const userDb: User[] = [];

@Injectable()
export class UserService {
  getUsers() {
    return userDb;
  }

  getUserById(id: string) {
    const user = userDb.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException('Not found');
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const date = Number(Date.now());
    const ui = uuidv4();
    const newUser = {
      id: ui,
      version: 1,
      createdAt: date,
      updatedAt: date,
      ...createUserDto,
    };
    userDb.push(newUser);
    const result = { ...newUser };
    delete result.password;
    return result;
  }

  updateUserById(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = userDb.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException('Not found');
    }

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new ForbiddenException('Old password is wrong ');
    }

    const version = user.version + 1;

    const newUser = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: version,
      updatedAt: Number(Date.now()),
    };

    const index = userDb.findIndex((item) => item.id === id);
    userDb[index] = newUser;
  }

  deleteUser(id: string) {
    const user = userDb.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException('Not found');
    } else {
      const userIndex = userDb.findIndex((item) => item.id === id);
      userDb.splice(userIndex, 1);
    }
  }
}

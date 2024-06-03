import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  static id: number = 0;
  users: User[];

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.id = ++UsersService.id;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.avatar = createUserDto.avatar;
    this.users.push(user);
    return user;
  }

  findAll(query?: any) {
    if (query && query.limit) {
      return this.users.slice(0, query.limit);
    }
    return this.users;
  }

  findOne(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return this.users[index];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // Utilizamos el findOne para que retorne un error si el id no existe
    const user = this.findOne(id);
    user.first_name = updateUserDto.first_name;
    user.last_name = updateUserDto.last_name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.avatar = updateUserDto.avatar;
    return user;
  }

  remove(id: number) {
    this.findOne(id);
    const index = this.users.findIndex((user) => user.id === id);
    return this.users.splice(index, 1);
  }
}

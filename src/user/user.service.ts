import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/db';
import {v4} from 'uuid'

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUSer = {
      ...createUserDto,
      id:v4(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };  

    db.users.push(newUSer);

    return newUSer;
  }

  findAll() {
    return db.users;
  }

  findOne(id: string) {
    const user = db.users.find(user => user.id === id)

    if(!user){
        return null;
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = db.users.find(user => user.id === id);

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();

    return user.login ;
  }

  remove(id: string) {
    const user = db.users.find(user => user.id === id);
   
    db.users = db.users.filter(user => user.id !== id);

    return user;
  }
}

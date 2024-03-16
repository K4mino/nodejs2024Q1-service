import { Injectable, NotFoundException,ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/db';
import {v4} from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      ...createUserDto,
      id:v4(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);  
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if(!user){
      throw new NotFoundException('User not found');
    }

    if(user.password !== updateUserDto.oldPassword){
      throw new ForbiddenException('Wrong password');
    }
    user.updatedAt = Date.now();
    this.userRepository.merge(user, updateUserDto);
    return user
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}

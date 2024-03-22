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
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);  
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...userWithoutPassword } =await user;
    return  userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if(!user){
      throw new NotFoundException('User not found');
    }

    if(user.password !== updateUserDto.oldPassword){
      throw new ForbiddenException('Wrong password');
    }
    user.updatedAt = new Date();
    user.password = updateUserDto.newPassword;
    const {password,...userUpdated} = await this.userRepository.save(user);
    return userUpdated
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if(!user){
      throw new NotFoundException('User not found');
    }
    
    return await this.userRepository.delete(id);
  }
}

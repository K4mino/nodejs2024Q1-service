import { Injectable, NotFoundException,ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id:v4(),
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const user = this.userRepository.create(newUser);
    const savedUser = await this.userRepository.save(user);
    const { password, ...createdUser } = savedUser
    return  {
      ...createdUser,
      createdAt:+createdUser.createdAt,
      updatedAt:+createdUser.updatedAt
    };  
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ select: ['id','login','version','createdAt','updatedAt'],where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }else {
      return  user;
    }
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
    const updatedUser = await this.userRepository.save(user);
    const { password, ...updatedUserWithoutPassword } = updatedUser;
    return {
      ...updatedUserWithoutPassword,
      createdAt:+updatedUserWithoutPassword.createdAt,
      updatedAt:+updatedUserWithoutPassword.updatedAt
    };  ;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ select: ['id','login','version','createdAt','updatedAt'],where: { id } });

    if(!user){
      throw new NotFoundException('User not found');
    }
    
    return await this.userRepository.delete(id);
  }
}

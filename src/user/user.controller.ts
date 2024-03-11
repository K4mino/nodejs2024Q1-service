import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { HttpCode } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid user id'); ;
    }

    const user = this.userService.findOne(id)

    if(!user){
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid user id'); ;
    }

    const user = this.userService.findOne(id)

    if(!user){
      throw new NotFoundException('User not found');
    }

    if(user.password !== updateUserDto.oldPassword){
      throw new ForbiddenException('Wrong password');
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid user id'); ;
    }

    const user = this.userService.findOne(id)

    if(!user){
      throw new NotFoundException('User not found');
    }

    return this.userService.remove(id);
  }
}

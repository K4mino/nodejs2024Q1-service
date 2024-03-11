import { Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { HttpCode } from '@nestjs/common/decorators';
import { validate as classValidate }  from 'class-validator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const errors = await classValidate(createUserDto)

    if(errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',new ParseUUIDPipe()) id: string) {

    const user = this.userService.findOne(id)

    if(!user){
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id',new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {

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
  remove(@Param('id',new ParseUUIDPipe()) id: string) {
    const user = this.userService.findOne(id)

    if(!user){
      throw new NotFoundException('User not found');
    }

    return this.userService.remove(id);
  }
}

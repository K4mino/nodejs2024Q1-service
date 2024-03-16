import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,ParseUUIDPipe } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { validate as classValidate }  from 'class-validator';
import { Put } from '@nestjs/common/decorators';
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findOne(id)

    if(!track){
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Put(':id')
  async update(@Param('id',new ParseUUIDPipe()) id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const track = this.trackService.findOne(id)

    if(!track){
      throw new NotFoundException('Track not found');
    }

    const errors = await classValidate(updateTrackDto)

    if(errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id',new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findOne(id)

    if(!track){
      throw new NotFoundException('Track not found');
    }

    return this.trackService.remove(id);
  }
}

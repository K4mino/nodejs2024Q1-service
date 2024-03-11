import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
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
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid track id'); ;
    }

    const track = this.trackService.findOne(id)

    if(!track){
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid track id'); ;
    }

    const track = this.trackService.findOne(id)

    if(!track){
      throw new NotFoundException('Track not found');
    }
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid track id'); ;
    }

    return this.trackService.remove(id);
  }
}

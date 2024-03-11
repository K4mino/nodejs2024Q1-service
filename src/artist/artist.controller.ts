import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,ParseUUIDPipe } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';
import { validate as classValidate }  from 'class-validator';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { Put } from '@nestjs/common/decorators';
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {

    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',new ParseUUIDPipe()) id: string) {

    const artist = this.artistService.findOne(id)

    if(!artist){
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Put(':id')
  update(@Param('id',new ParseUUIDPipe()) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    const artist = this.artistService.findOne(id)

    if(!artist){
      throw new NotFoundException('Artist not found');
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id',new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findOne(id)

    if(!artist){
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.remove(id);
  }
}

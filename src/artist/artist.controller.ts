import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';
import { validate as classValidate }  from 'class-validator';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const errors =await classValidate(createArtistDto)

    if(errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if(!validate(id)) {
      throw new BadRequestException('Invalid artist id'); ;
    }

    const artist = this.artistService.findOne(id)

    if(!artist){
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if(!validate(id)) {
      throw new BadRequestException('Invalid artist id'); ;
    }

    const artist = this.artistService.findOne(id)

    if(!artist){
      throw new NotFoundException('Artist not found');
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if(!validate(id)) {
      throw new BadRequestException('Invalid artist id'); ;
    }

    const artist = this.artistService.findOne(id)

    if(!artist){
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.remove(id);
  }
}

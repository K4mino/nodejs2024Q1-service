import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { validate as classValidate }  from 'class-validator';
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const errors =await classValidate(createAlbumDto)

    if(errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }

    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if(!validate(id)) {
      throw new BadRequestException('Invalid artist id'); ;
    }

    const album = this.albumService.findOne(id)

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return this.albumService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if(!validate(id)) {
      throw new BadRequestException('Invalid artist id'); ;
    }

    const album = this.albumService.findOne(id)

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(!validate(id)) {
      throw new BadRequestException('Invalid artist id'); ;
    }

    const album = this.albumService.findOne(id)

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return this.albumService.remove(id);
  }
}

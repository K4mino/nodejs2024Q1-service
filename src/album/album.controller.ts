import { Controller, Get, Post, Body, Patch, Param, Delete,ParseUUIDPipe } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { validate as classValidate }  from 'class-validator';
import { Put } from '@nestjs/common/decorators';
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',new ParseUUIDPipe()) id: string) {

    const album = this.albumService.findOne(id)

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(@Param('id',new ParseUUIDPipe()) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumService.findOne(id)

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id',new ParseUUIDPipe()) id: string) {

    const album = this.albumService.findOne(id)

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return this.albumService.remove(id);
  }
}

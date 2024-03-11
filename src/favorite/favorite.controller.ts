import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/track/:id')
  create(@Param() id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid track id');
    }
    return this.favoriteService.addTrackToFavorites(id);
  }

  @Post('/album/:id')
  createAlbum(@Param() id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid album id');
    }
    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Post('/artist/:id')
  createArtist(@Param() id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artist id');
    }
    return this.favoriteService.addArtistToFavorites(id);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(id);
  }
}

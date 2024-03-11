import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { validate } from 'uuid';
import { BadRequestException, ForbiddenException, NotFoundException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { db } from 'src/db';
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('/track/:id')
  create(@Param() id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid track id');
    }

    const track = db.tracks.find(track => track.id === id);

    if(!track){
      throw new UnprocessableEntityException('Track not found');
    }

    return this.favoriteService.addTrackToFavorites(id);
  }

  @Post('/album/:id')
  createAlbum(@Param() id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = db.albums.find(album => album.id === id);

    if(!album){
      throw new UnprocessableEntityException('Album not found');
    }

    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Post('/artist/:id')
  createArtist(@Param() id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = db.artists.find(artist => artist.id === id);

    if(!artist){
      throw new UnprocessableEntityException('Artist not found');
    }
    return this.favoriteService.addArtistToFavorites(id);
  }

  
  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artist id');
    }
    return this.favoriteService.deleteTrackFromFavorites(id);
  }

  
  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artist id');
    }
    return this.favoriteService.deleteAlbumFromFavorites(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artist id');
    }
    return this.favoriteService.deleteArtistFromFavorites(id);
  }
}

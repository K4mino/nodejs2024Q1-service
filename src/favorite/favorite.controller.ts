import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('/track/:id')
  create(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addTrackToFavorites(id);
  }

  @Post('/album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Post('/artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addArtistToFavorites(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteTrackFromFavorites(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteAlbumFromFavorites(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteArtistFromFavorites(id);
  }
}

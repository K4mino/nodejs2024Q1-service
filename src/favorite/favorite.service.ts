import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { db } from 'src/db';
@Injectable()
export class FavoriteService {
  addTrackToFavorites(id: string) {
    db.favs.tracks.push(id);
    return id;
  }

  addAlbumToFavorites(id: string) {
    db.favs.albums.push(id);
    return id;
  }

  addArtistToFavorites(id: string) {
    db.favs.artists.push(id);
    return id;
  }

  findAll() {
    return db.favs;
  }

  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: string) {
    return `This action removes a #${id} favorite`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { db } from 'src/db';
import { findAllByIds } from './utils';
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

  deleteTrackFromFavorites(id: string) {
    db.favs.tracks = db.favs.tracks.filter(trackId => trackId !== id);
    return id;
  }

  deleteAlbumFromFavorites(id: string) {
    db.favs.albums = db.favs.albums.filter(albumId => albumId !== id);
    return id;
  }

  deleteArtistFromFavorites(id: string) {
    db.favs.artists = db.favs.artists.filter(artistId => artistId !== id);
    return id;
  }
  findAll() {
    const artists = findAllByIds('artists');
    const albums = findAllByIds('albums');
    const tracks = findAllByIds('tracks');
   
    return {
      artists,
      albums,
      tracks
    };
  }

  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: string) {
    return `This action removes a #${id} favorite`;
  }
}

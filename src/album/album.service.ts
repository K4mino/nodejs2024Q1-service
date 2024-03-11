import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { db } from 'src/db';
import { v4 } from 'uuid';
@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...createAlbumDto,
      id:v4()
    } 

    db.albums.push(newAlbum);

    return newAlbum;
  }

  findAll() {
    return db.albums;
  }

  findOne(id: string) {
    return db.albums.find(album => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = db.albums.find(album => album.id === id);

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return {
      name: album.name,
      year: album.year,
      artistId: album.artistId
    };
  }

  remove(id: string) {
    const album = db.albums.find(album => album.id === id);

    db.albums = db.albums.filter(album => album.id !== id);
    db.tracks = db.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track
    })
    return album;
  }
}

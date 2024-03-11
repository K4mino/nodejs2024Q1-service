import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { db } from 'src/db';
import { v4 } from 'uuid';
@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      ...createArtistDto,
      id: v4(),
    }

    db.artists.push(artist);

    return artist;
  }

  findAll() {
    return db.artists;
  }

  findOne(id: string) {
    return db.artists.find(artist => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = db.artists.find(artist => artist.id === id);

    artist.name = updateArtistDto.name;

    return artist;
  }

  remove(id: string) {
    const artist = db.artists.find(artist => artist.id === id);

    db.artists = db.artists.filter(artist => artist.id !== id);
    db.tracks = db.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track
    });
    db.albums = db.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album
    })
    db.favs.artists = db.favs.artists.filter(artistId => artistId !== id);
    return artist;
  }
}

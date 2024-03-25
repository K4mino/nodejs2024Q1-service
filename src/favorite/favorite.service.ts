import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}
  async addTrackToFavorites(id: string) {
    const track = await this.trackService.findOne(id, 'favs');

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: { tracks: true },
    });

    return await this.favoriteRepository.save({
      id: 1,
      tracks: [...favorites.tracks, track],
    });
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumService.findOne(id, 'favs');

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: { albums: true },
    });

    return await this.favoriteRepository.save({
      id: 1,
      albums: [...favorites.albums, album],
    });
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistService.findOne(id, 'favs');

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: { artists: true },
    });

    return await this.favoriteRepository.save({
      id: 1,
      artists: [...favorites.artists, artist],
    });
  }

  async deleteTrackFromFavorites(id: string) {
    const track = await this.trackService.findOne(id, 'favs');

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: { tracks: true },
    });

    const { tracks } = favorites;

    const newTracks = tracks.filter((track) => track.id !== id);

    await this.favoriteRepository.save({
      id: 1,
      tracks: newTracks,
    });

    return track;
  }

  async deleteAlbumFromFavorites(id: string) {
    const album = await this.albumService.findOne(id, 'favs');

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: { albums: true },
    });

    const { albums } = favorites;

    const newAlbums = albums.filter((album) => album.id !== id);

    await this.favoriteRepository.save({
      id: 1,
      albums: newAlbums,
    });
    return album;
  }

  async deleteArtistFromFavorites(id: string) {
    const artist = await this.artistService.findOne(id, 'favs');

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: { artists: true },
    });

    const { artists } = favorites;

    const newArtists = artists.filter((artist) => artist.id !== id);

    await this.favoriteRepository.save({
      id: 1,
      artists: newArtists,
    });

    return artist;
  }
  async findAll() {
    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }
}

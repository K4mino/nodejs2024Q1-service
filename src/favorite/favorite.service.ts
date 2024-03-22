import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { findAllByIds } from './utils';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common/exceptions';
@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService
  ) {}
  async addTrackToFavorites(id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favorites =await this.favoriteRepository.findOne({ where: { id:1 } },);

    favorites.tracks.push(id);

    return await this.favoriteRepository.save(favorites);
  }

  async addAlbumToFavorites(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    const favorites = await this.favoriteRepository.findOne({ where: { id:1 } },);

    favorites.albums.push(id);

    return await this.favoriteRepository.save(favorites);
  }

  async addArtistToFavorites(id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const favorites = await this.favoriteRepository.findOne({ where: { id:1 } },);

    favorites.artists.push(id);

    return await this.favoriteRepository.save(favorites);
  }

  async deleteTrackFromFavorites(id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favorites = await this.favoriteRepository.findOne({ where: { id:1 } },);

    favorites.tracks = favorites.tracks.filter(track => track !== id);

    return await this.favoriteRepository.save(favorites);
  }

  async deleteAlbumFromFavorites(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    const favorites = await this.favoriteRepository.findOne({ where: { id:1 } },);

    favorites.albums = favorites.albums.filter(album => album !== id);

    return await this.favoriteRepository.save(favorites);
  }

  async deleteArtistFromFavorites(id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const favorites = await this.favoriteRepository.findOne({ where: { id:1 } },);

    favorites.artists = favorites.artists.filter(artist => artist !== id);

    return await this.favoriteRepository.save(favorites);
  }
  async findAll() {
    const favorites = await this.favoriteRepository.findOne({ where: { id:1 } },);
    const artists = findAllByIds('artist',this.artistService,favorites);
    const albums = findAllByIds('album',this.albumService,favorites);
    const tracks = findAllByIds('track',this.trackService,favorites);

    return {
      artists,
      albums,
      tracks
    };
  }
}

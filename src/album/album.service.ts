import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ){}
  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...createAlbumDto,
      id:v4()
    } 

    const album = await this.albumRepository.create(newAlbum);
    return await this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if(!album){
      throw new NotFoundException('Album not found');
    }

    Object.assign(album, updateAlbumDto);

    await this.albumRepository.save(album);

    return  album;
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if(!album){
      throw new NotFoundException('Album not found');
    }

    return await this.albumRepository.delete(id);
  }
}

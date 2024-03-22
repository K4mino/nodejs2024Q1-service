import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from 'src/db';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      ...createTrackDto,
      id: v4(),
    };

    const user = this.trackRepository.create(newTrack);
    return await this.trackRepository.save(user);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if(!track){
      throw new  NotFoundException('Track not found');
    }

    return track
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if(!track){
      throw new NotFoundException('User not found');
    }

    const updatedTrack = {
      ...track,
      ...updateTrackDto
    }
   
    return updatedTrack
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if(!track){
      throw new NotFoundException('User not found');
    }
    

    return await this.trackRepository.delete(id);
  }
}

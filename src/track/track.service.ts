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

  findAll() {
    return db.tracks;
  }

  findOne(id: string) {
    return db.tracks.find(track => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = db.tracks.findIndex(track => track.id === id);

    const updatedTrack = {
        ...db.tracks[trackIndex],
        ...updateTrackDto,
    };

    db.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const track = db.tracks.find(track => track.id === id);

    db.tracks = db.tracks.filter(track => track.id !== id);
    db.favs.tracks = db.favs.tracks.filter(trackId => trackId !== id);
    return track;
  }
}

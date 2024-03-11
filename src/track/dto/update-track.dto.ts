import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

interface IUpdateTrackDto {
    name?: string;
    artistId?: string | null;
    albumId?: string | null;
    duration?: number;
}
export class UpdateTrackDto implements IUpdateTrackDto{
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
    constructor(name: string, artistId: string | null, albumId: string | null, duration: number) {
        this.name = name;
        this.artistId = artistId || null;
        this.albumId = albumId || null;
        this.duration = duration;
    }
    
}

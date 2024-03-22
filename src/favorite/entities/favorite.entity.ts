import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
@Entity()
export class Favorite implements Favorites{
    artists: string[]; 
    albums: string[];
    @ManyToMany(type => Track, { cascade: true })
    @JoinTable()
    tracks: string[]; 
    constructor(artists: string[], albums: string[], tracks: string[]) {
        this.artists = artists;
        this.albums = albums;
        this.tracks = tracks;
    }
}

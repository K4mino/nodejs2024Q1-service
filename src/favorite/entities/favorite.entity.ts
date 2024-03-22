import { Entity, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
interface Favorites {
    id:number
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
@Entity()
export class Favorite implements Favorites{
    @PrimaryColumn()
    id: number = 1
    @ManyToMany(type => Artist, { cascade: true })
    @JoinTable()
    artists: string[];
    @ManyToMany(type => Album, { cascade: true })
    @JoinTable() 
    albums: string[];
    @ManyToMany(type => Track, { cascade: true })
    @JoinTable()
    tracks: string[]; 
}

import { Entity, ManyToMany, JoinTable, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
    id: number = 1;

    @ManyToMany(() => Track, { onDelete: 'CASCADE' })
    @JoinTable()
    tracks: string[];

    @ManyToMany(() => Album, { onDelete: 'CASCADE' })
    @JoinTable()
    albums: string[];

    @ManyToMany(() => Artist, { onDelete: 'CASCADE' })
    @JoinTable()
    artists: string[];
}

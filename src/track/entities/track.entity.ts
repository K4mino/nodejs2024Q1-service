import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Entity, PrimaryGeneratedColumn, Column,VersionColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, RelationId } from 'typeorm';
interface ITrack {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }
@Entity()
export class Track implements ITrack{
    @PrimaryGeneratedColumn('uuid')
    id: string; 
    @Column('text')
    name: string;
    @ManyToOne(() => Artist)
    artist: Artist; 
    @RelationId((track: Track) => track.artistId)
    artistId: string | null; 
    @ManyToOne(() => Album)
    album: Album; 
    @RelationId((track: Track) => track.albumId)
    albumId: string | null; 
    @Column('int')
    duration: number;
}

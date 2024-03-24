import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, RelationId } from 'typeorm';
interface ITrack {
    id: string; // uuid v4
    name: string;
    artistId?: string | null; // refers to Artist
    albumId?: string | null; // refers to Album
    duration: number; // integer number
  }
@Entity()
export class Track implements ITrack{
    @PrimaryGeneratedColumn('uuid')
    id: string; 
    @Column('text')
    name: string;
    @ManyToOne(() => Artist, artist => artist.id,{ onDelete: 'SET NULL' })
    artist?: Artist; 
    @Column({nullable: true}) 
    artistId?: string | null;
    @ManyToOne(() => Album, album => album.id,{ onDelete: 'SET NULL' })
    album?: Album; 
    @Column({nullable: true})
    albumId?: string | null;
    @Column('int')
    duration: number;
}

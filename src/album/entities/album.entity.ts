import { Entity, PrimaryGeneratedColumn, Column,VersionColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, RelationId } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
interface IAlbum {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
  }
@Entity()
export class Album implements IAlbum{
    @PrimaryGeneratedColumn('uuid')
    id: string; 
    @Column('text')
    name: string;
    @Column('int')
    year: number;

    @ManyToOne(() => Artist)
    artist: Artist;

    @Column('uuid')
    artistId: string | null; 
}

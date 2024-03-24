import { Entity, PrimaryGeneratedColumn, Column,VersionColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
interface IAlbum {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId?: string | null; // refers to Artist
  }
@Entity()
export class Album implements IAlbum{
    @PrimaryGeneratedColumn('uuid')
    id: string; 
    @Column('text')
    name: string;
    @Column('int')
    year: number;

    @ManyToOne(() => Artist, artist => artist.id,{ onDelete: 'SET NULL' })
    artist?: Artist;

    @Column({nullable: true})
    artistId?: string | null; 

    @ManyToMany(() => Favorite, favorite=>favorite.albums,{ onDelete: 'CASCADE' })
    @JoinTable()
    favorites: Favorite[];
}

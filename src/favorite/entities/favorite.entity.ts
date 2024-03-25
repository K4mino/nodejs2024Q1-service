import {
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
interface Favorites {
  id: number;
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
@Entity()
export class Favorite implements Favorites {
  @PrimaryColumn({ primary: true, type: 'integer', default: 1 })
  id: number;
  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[];
}

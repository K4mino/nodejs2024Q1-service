import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
@Entity()
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column('boolean')
  grammy: boolean;
}

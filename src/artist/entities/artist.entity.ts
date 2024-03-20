import { Entity, PrimaryGeneratedColumn, Column,VersionColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, RelationId } from 'typeorm';
interface IArtist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
@Entity()
export class Artist implements IArtist{
    @PrimaryGeneratedColumn('uuid')
    id: string; 
    @Column('text')
    name: string;
    @Column('boolean')
    grammy: boolean;
}

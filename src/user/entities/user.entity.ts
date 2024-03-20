import { Entity, PrimaryGeneratedColumn, Column,VersionColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
interface IUser {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: Date; // timestamp of creation
    updatedAt: Date; // timestamp of last update
  }

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string; 
    @Column('text')
    login: string;
    @Column('text')
    password: string;
    @VersionColumn()
    version: number;
    @CreateDateColumn({ type: 'timestamp' } ) 
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; 

    constructor(id: string, login: string, password: string, version: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.version = version;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
interface IUser {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: string; 
    @Column('text')
    login: string;
    @Column('text')
    password: string;
    @Column('int')
    version: number;
    @Column( { default: 0 } ) 
    createdAt: number;
    @Column( { default: 0 } ) 
    updatedAt: number; 

    constructor(id: string, login: string, password: string, version: number, createdAt: number, updatedAt: number) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.version = version;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
interface IUpdateTrackDto {
    name?: string;
    artistId?: string | null;
    albumId?: string | null;
    duration?: number;
}
export class UpdateTrackDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsOptional()
    artistId: string | null;
    @IsOptional()
    @IsString()
    albumId: string | null;
    @IsNotEmpty()
    @IsNumber()
    duration: number;
    constructor(name: string, artistId: string | null, albumId: string | null, duration: number) {
        this.name = name;
        this.artistId = artistId || null;
        this.albumId = albumId || null;
        this.duration = duration;
    }
    
}

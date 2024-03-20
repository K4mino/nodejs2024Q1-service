import { IsNotEmpty } from "class-validator";

interface ICreateTrackDto {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}

export class CreateTrackDto implements ICreateTrackDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    artistId: string | null;
    albumId: string | null;
    @IsNotEmpty()
    duration: number;
    constructor(name: string, artistId: string | null, albumId: string | null, duration: number) {
        this.name = name;
        this.artistId = artistId || null;
        this.albumId = albumId || null;
        this.duration = duration;
    }
}
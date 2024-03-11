import { IsNotEmpty } from "class-validator";

interface ICreateAlbumDto {
        name: string;
        year: number;
        artistId: string | null;
    }

export class CreateAlbumDto implements ICreateAlbumDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    year: number;
    artistId: string | null;
    constructor(name: string, year: number, artistId: string | null) {
        this.name = name;
        this.year = year;
        this.artistId = artistId || null;
    }
}

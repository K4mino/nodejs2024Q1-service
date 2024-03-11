interface ICreateTrackDto {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}

export class CreateTrackDto implements ICreateTrackDto{
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
    constructor(name: string, artistId: string | null, albumId: string | null, duration: number) {
        this.name = name;
        this.artistId = artistId;
        this.albumId = albumId;
        this.duration = duration;
    }
}

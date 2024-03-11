interface ICreateArtistDto {
        name: string;
        grammy: boolean;
    }

export class CreateArtistDto implements ICreateArtistDto{
    name: string;
    grammy: boolean;
    constructor(name: string, grammy: boolean) {
        this.name = name;
        this.grammy = grammy;
    }
}

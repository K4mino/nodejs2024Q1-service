import { IsNotEmpty } from "class-validator";

interface ICreateArtistDto {
        name: string;
        grammy: boolean;
    }

export class CreateArtistDto implements ICreateArtistDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    grammy: boolean;
    constructor(name: string, grammy: boolean) {
        this.name = name;
        this.grammy = grammy;
    }
}

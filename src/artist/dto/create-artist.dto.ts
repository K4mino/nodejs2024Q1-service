import { IsNotEmpty, IsBoolean,IsString } from "class-validator";

interface ICreateArtistDto {
        name: string;
        grammy: boolean;
    }

export class CreateArtistDto implements ICreateArtistDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsBoolean()
    @IsNotEmpty()
    grammy: boolean;
    constructor(name: string, grammy: boolean) {
        this.name = name;
        this.grammy = grammy;
    }
}

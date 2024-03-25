import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId?: string | null;
}

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsString()
  @IsOptional()
  artistId?: string | null;
}

import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
interface ICreateTrackDto {
  name: string;
  artistId?: string | null;
  albumId?: string | null;
  duration: number;
}

export class CreateTrackDto implements ICreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  artistId?: string | null;
  @IsOptional()
  @IsString()
  albumId?: string | null;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}

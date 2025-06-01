import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @IsString()
  @IsNotEmpty()
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

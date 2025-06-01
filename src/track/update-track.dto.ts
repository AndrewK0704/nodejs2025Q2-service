import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  artistId?: string | null;

  @IsString()
  @IsNotEmpty()
  albumId?: string;

  @IsNumber()
  @IsNotEmpty()
  duration?: number;
}

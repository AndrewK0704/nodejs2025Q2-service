import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_object, value) => value !== null)
  artistId?: string | null;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_object, value) => value !== null)
  albumId?: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration?: number;
}

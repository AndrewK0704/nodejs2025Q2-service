import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
}

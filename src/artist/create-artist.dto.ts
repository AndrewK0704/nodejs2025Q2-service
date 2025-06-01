import { IsNotEmpty, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

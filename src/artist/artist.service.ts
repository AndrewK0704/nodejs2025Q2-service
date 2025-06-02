import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateArtistDto } from './create-artist.dto';
import { UpdateArtistDto } from './update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { trackDb } from '../track/track.service';
import { albumDb } from '../album/album.service';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export const artistDb: Artist[] = [];

@Injectable()
export class ArtistService {
  getArtists() {
    return artistDb;
  }

  getArtistById(id: string) {
    const artist = artistDb.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException('Not found');
    }

    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const ui = uuidv4();
    const newArtist = {
      id: ui,
      ...createArtistDto,
    };
    artistDb.push(newArtist);
    const result = { ...newArtist };
    return result;
  }

  updateArtistById(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artistDb.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException('Not found');
    }

    const newArtist = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    const index = artistDb.findIndex((item) => item.id === id);
    artistDb[index] = newArtist;
  }

  deleteArtist(id: string) {
    const artist = artistDb.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException('Not found');
    } else {
      albumDb.forEach((album) => {
        if (album.artistId == id) {
          album.artistId = null;
        }
      });

      trackDb.forEach((track) => {
        if (track.artistId == id) {
          track.artistId = null;
        }
      });

      const artistIndex = artistDb.findIndex((item) => item.id === id);
      artistDb.splice(artistIndex, 1);
    }
  }
}

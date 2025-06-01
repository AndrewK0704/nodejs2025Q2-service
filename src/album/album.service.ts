import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { trackDb } from '../track/track.service';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export const albumDb: Album[] = [];

@Injectable()
export class AlbumService {
  getAlbums() {
    return albumDb;
  }

  getAlbumById(id: string) {
    const album = albumDb.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException('Not found');
    }

    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const ui = uuidv4();
    const newAlbum = {
      id: ui,
      ...createAlbumDto,
    };
    albumDb.push(newAlbum);
    const result = { ...newAlbum };
    return result;
  }

  updateAlbumById(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albumDb.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException('Not found');
    }

    const newAlbum = {
      ...album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };

    const index = albumDb.findIndex((item) => item.id === id);
    albumDb[index] = newAlbum;

    const returnAlbumNew = JSON.parse(JSON.stringify(newAlbum));
    delete returnAlbumNew.password;

    return returnAlbumNew;
  }

  deleteAlbum(id: string) {
    const index = albumDb.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Not found');
    }

    trackDb.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    albumDb.splice(index, 1);

    return 'Deleted';
  }
}

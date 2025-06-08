import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';

import { Artist, artistDb } from '../artist/artist.service';
import { Album, albumDb } from '../album/album.service';
import { Track, trackDb } from '../track/track.service';
import { userDb } from 'src/user/user.service';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export const favoritesDb = { artists: [], albums: [], tracks: [] };

export const db = {
  userDb,
  artistDb,
  trackDb,
  albumDb,
  favoritesDb,
};

@Injectable()
export class FavoritesService {
  getFavorites() {
    const artists = [];
    const albums = [];
    const tracks = [];

    db.favoritesDb.tracks.forEach((id) => {
      const track = db.trackDb.find((track) => track.id === id);
      if (track) {
        tracks.push(track);
      }
    });

    db.favoritesDb.albums.forEach((id) => {
      const album = db.albumDb.find((album) => album.id === id);

      if (album) {
        albums.push(album);
      }
    });

    db.favoritesDb.artists.forEach((id) => {
      const artist = db.artistDb.find((artist) => artist.id === id);

      if (artist) {
        artists.push(artist);
      }
    });

    // if(!tracks && !albums && !artists){
    //   return undefined

    // }

    return {
      tracks,
      albums,
      artists,
    };
  }

  createAlbumByIdFavorites(id: string) {
    const index = db.albumDb.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new UnprocessableEntityException();
    }

    db.favoritesDb.albums.push(id);

    return index;
  }

  createArtistByIdFavorites(id: string) {
    const index = db.artistDb.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new UnprocessableEntityException();
    }

    db.favoritesDb.artists.push(id);

    return index;
  }

  createTrackByIdFavorites(id: string) {
    const index = db.trackDb.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new UnprocessableEntityException();
    }

    db.favoritesDb.tracks.push(id);

    return index;
  }

  deleteTrackByIdFavorites(id: string) {
    const index = db.favoritesDb.tracks.findIndex((item) => item === id);

    if (index === -1) {
      throw new NotFoundException('Not found');
    }

    db.favoritesDb.tracks = db.favoritesDb.tracks.filter(
      (track) => track !== id,
    );

    return;
  }

  deleteAlbumByIdFavorites(id: string) {
    const index = db.favoritesDb.albums.findIndex((item) => item === id);

    if (index === -1) {
      throw new NotFoundException('Not found');
    }

    db.favoritesDb.albums = db.favoritesDb.albums.filter(
      (album) => album !== id,
    );

    return;
  }

  deleteArtistByIdFavorites(id: string) {
    const index = db.favoritesDb.artists.findIndex((item) => item === id);

    if (index === -1) {
      throw new NotFoundException('Not found');
    }

    db.favoritesDb.artists = db.favoritesDb.artists.filter(
      (artist) => artist !== id,
    );

    return;
  }
}

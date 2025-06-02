import { Injectable } from '@nestjs/common';

import { Artist, artistDb } from '../artist/artist.service';
import { Album, albumDb } from '../album/album.service';
import { Track, trackDb } from '../track/track.service';
import { userDb } from 'src/user/user.service';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

// const artists=[];
// const albums=[];
// const tracks=[];

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
    return db.favoritesDb;
  }

  // deleteArtistFavorites(id: string) {
  //   const artist = db.favoritesDb.artists.find((item) => item.id === id);

  //   if (!artist) {
  //     throw new NotFoundException('Not found');
  //   } else {
  //     const artistIndex = db.favoritesDb.artists.findIndex(
  //       (item) => item.id === id,
  //     );
  //     if (artistIndex === -1) return false;
  //     db.favoritesDb.artists.splice(artistIndex, 1);
  //     return true;
  //   }
  // }
}

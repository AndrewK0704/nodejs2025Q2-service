import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';
import { v4 as uuidv4 } from 'uuid';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export const trackDb: Track[] = [];

@Injectable()
export class TrackService {
  getTracks() {
    return trackDb;
  }

  getTrackById(id: string) {
    const track = trackDb.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException('Not found');
    }

    return track;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const ui = uuidv4();
    const newTrack = {
      id: ui,
      ...createTrackDto,
    };
    trackDb.push(newTrack);
    const result = { ...newTrack };
    return result;
  }

  updateTrackById(id: string, updateTrackDto: UpdateTrackDto) {
    const track = trackDb.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException('Not found');
    }

    const newTrack = {
      ...track,
      ...updateTrackDto,
    };

    const index = trackDb.findIndex((item) => item.id === id);
    trackDb[index] = newTrack;
  }

  deleteTrack(id: string) {
    const track = trackDb.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException('Not found');
    } else {
      const trackIndex = trackDb.findIndex((item) => item.id === id);
      trackDb.splice(trackIndex, 1);
    }
  }
}

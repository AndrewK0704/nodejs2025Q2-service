import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

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
          name: updateTrackDto.name,
          artistId: updateTrackDto.artistId,
          albumId: updateTrackDto.albumId,
          duration: updateTrackDto.duration,

        };
    
        const index = trackDb.findIndex((item) => item.id === id);
        trackDb[index] = newTrack;
    
        const returnTrackNew = JSON.parse(JSON.stringify(newTrack));
        delete returnTrackNew.password;
    
        return returnTrackNew;
      }
    
      deleteTrack(id: string) {
        const track = trackDb.find((item) => item.id === id);
    
        if (!track) {
          throw new NotFoundException('Not found');
        } else {
          const trackIndex = trackDb.findIndex((item) => item.id === id);
          if (trackIndex === -1) return null;
          const deletedTrack = trackDb.splice(trackIndex, 1);
          return deletedTrack;
        }
    }

}

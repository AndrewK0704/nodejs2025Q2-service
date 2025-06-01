import { 
    Injectable,
    NotFoundException,
    ForbiddenException, 
} from '@nestjs/common';

import { CreateArtistDto } from './create-artist.dto';
import { UpdateArtistDto } from './update-artist.dto';
import { v4 as uuidv4 } from 'uuid';

export interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}

@Injectable()
export class ArtistService {
    artistDb: Artist[] = [];
    
    getArtists() {
        return this.artistDb;
    }

    getArtistById(id: string) {
        const artist = this.artistDb.find((item) => item.id === id);

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
        this.artistDb.push(newArtist);
        const result = { ...newArtist };
        return result;
    }

    updateArtistById(id: string, updateArtistDto: UpdateArtistDto) {
        const artist = this.artistDb.find((item) => item.id === id);
    
        if (!artist) {
          throw new NotFoundException('Not found');
        }
    
        const newArtist = {
          ...artist,
          name: updateArtistDto.name,
          grammy: updateArtistDto.grammy,
        };
    
        const index = this.artistDb.findIndex((item) => item.id === id);
        this.artistDb[index] = newArtist;
    
        const returnArtistNew = JSON.parse(JSON.stringify(newArtist));
        delete returnArtistNew.password;
    
        return returnArtistNew;
    }

    deleteArtist(id: string) {
        const artist = this.artistDb.find((item) => item.id === id);

        if (!artist) {
            throw new NotFoundException('Not found');
        } else {
        const artistIndex = this.artistDb.findIndex((item) => item.id === id);
        if (artistIndex === -1) return null;
        const deletedArtist = this.artistDb.splice(artistIndex, 1);
        return deletedArtist;
        }
    }
}

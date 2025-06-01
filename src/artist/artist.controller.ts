import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    ParseUUIDPipe
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './create-artist.dto';
import { UpdateArtistDto } from './update-artist.dto';

@Controller('artist')
export class ArtistController {
    constructor(readonly artistService: ArtistService) {}
    
    @Get()
    @HttpCode(200)
    getArtists() {
    return this.artistService.getArtists();
    }

    @Get(':id')
    @HttpCode(200)
    getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getArtistById(id);
    }

    @Post()
    @HttpCode(201)
    createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
    }

    @Put(':id')
    @HttpCode(200)
    updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    ) {
        return this.artistService.updateArtistById(id, updateArtistDto);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.artistService.deleteArtist(id);
    }

}

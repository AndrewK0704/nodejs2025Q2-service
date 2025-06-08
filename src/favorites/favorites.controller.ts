import {
  Controller,
  Get,
  HttpCode,
  ParseUUIDPipe,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('album/:id')
  @HttpCode(201)
  createAlbumByIdFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.createAlbumByIdFavorites(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  createTrackByIdFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.createTrackByIdFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  createArtistByIdFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.createArtistByIdFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackByIdFavorites(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteTrackByIdFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumByIdFavorites(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteAlbumByIdFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistByIdFavorites(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteArtistByIdFavorites(id);
  }
}

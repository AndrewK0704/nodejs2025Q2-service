import { Controller, Get, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  // @Delete('artist/:id')
  // @HttpCode(204)
  // deleteArtistFavorites(@Param('id', ParseUUIDPipe) id: string) {
  //   this.favoritesService.deleteArtistFavorites(id);
  // }
}

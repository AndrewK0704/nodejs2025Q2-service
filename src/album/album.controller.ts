import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbumById(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.albumService.deleteAlbum(id);
  }
}

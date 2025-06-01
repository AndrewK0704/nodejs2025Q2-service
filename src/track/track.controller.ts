import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';

@Controller('track')
export class TrackController {
    constructor(readonly trackService: TrackService) {}

    @Get()
    @HttpCode(200)
    getTracks() {
    return this.trackService.getTracks();
    }

    @Get(':id')
    @HttpCode(200)
    getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getTrackById(id);
    }

    @Post()
    @HttpCode(201)
    createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
    }

    @Put(':id')
    @HttpCode(200)
    updateTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    ) {
    return this.trackService.updateTrackById(id, updateTrackDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.trackService.deleteTrack(id);
    }

}

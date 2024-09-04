import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovideDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // 모든 영화 목록을 반환하는 API
  @Get()
  getMovies(@Query('title') title?: string) {
    return this.movieService.getManyMovies(title);
  }

  // 특정 ID 값을 가진 영화를 반환하는 API
  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }

  // 새로운 영화를 생성하는 API
  @Post()
  postMovie(@Body() body: CreateMovieDto) {
    return this.movieService.createMovie(body);
  }

  // 특정 ID 값을 가진 영화를 수정하는 API
  @Patch(':id')
  patchMovie(@Body() body: UpdateMovideDto, @Param('id') id: string) {
    return this.movieService.updateMovie(id, body);
  }

  // 특정 ID 값을 가진 영화를 삭제하는 API
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }
}

import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieTitleValidationPipe } from './pipe/movie-title-validation.pipe';
import { AuthGuard } from 'src/auth/guard/auth.guard';
@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // 모든 영화 목록을 반환하는 API
  @Get()
  getMovies(@Query('title', MovieTitleValidationPipe) title?: string) {
    return this.movieService.findAll(title);
  }

  // 특정 ID 값을 가진 영화를 반환하는 API
  @Get(':id')
  getMovie(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.movieService.findOne(id);
  }

  // 새로운 영화를 생성하는 API
  @Post()
  @UseGuards(AuthGuard)
  postMovie(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  // 특정 ID 값을 가진 영화를 수정하는 API
  @Patch(':id')
  patchMovie(
    @Body() body: UpdateMovieDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.movieService.update(id, body);
  }

  // 특정 ID 값을 가진 영화를 삭제하는 API
  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovideDto } from './dto/update-movie.dto';

export interface Movie {
  id: number;
  title: string;
  genre: string;
}

@Injectable()
export class MovieService {
  private movies: Movie[] = [
    { id: 1, title: '해리포터', genre: '판타지' },
    { id: 2, title: '반지의 제왕', genre: '판타지' },
  ];
  private idCounter = 3;

  // 모든 영화 목록을 반환하는 메서드
  getManyMovies(title?: string) {
    if (!title) {
      return this.movies;
    }

    return this.movies.filter((movie) => movie.title.startsWith(title));
  }

  // 특정 ID 값을 가진 영화를 반환하는 메서드
  getMovieById(id: string) {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    return movie;
  }

  // 새로운 영화를 생성하는 메서드
  createMovie(createMovieDto: CreateMovieDto) {
    const newMovie = {
      id: this.idCounter,
      ...createMovieDto,
    };

    this.movies.push(newMovie);
    this.idCounter += 1;

    return newMovie;
  }

  // 특정 ID 값을 가진 영화를 수정하는 메서드
  updateMovie(id: string, updateMovieDto: UpdateMovideDto) {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    Object.assign(movie, updateMovieDto);

    return movie;
  }

  // 특정 ID 값을 가진 영화를 삭제하는 메서드
  deleteMovie(id: string) {
    const movieIndex = this.movies.findIndex((movie) => movie.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    this.movies.splice(movieIndex, 1);

    return id;
  }
}

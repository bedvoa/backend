import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovideDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  // 모든 영화 목록을 반환하는 메서드
  async getManyMovies(title?: string) {
    return await this.movieRepository.find();
  }

  // 특정 ID 값을 가진 영화를 반환하는 메서드
  async getMovieById(id: number) {
    return await this.movieRepository.findOne({ where: { id } });
  }

  // 새로운 영화를 생성하는 메서드
  async createMovie(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.save({
      ...createMovieDto,
    });

    return movie;
  }

  // 특정 ID 값을 가진 영화를 수정하는 메서드
  async updateMovie(id: number, updateMovieDto: UpdateMovideDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    await this.movieRepository.update({ id }, { ...updateMovieDto });

    const newMovie = await this.movieRepository.findOne({ where: { id } });

    return newMovie;
  }

  // 특정 ID 값을 가진 영화를 삭제하는 메서드
  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    return await this.movieRepository.delete({ id });
  }
}

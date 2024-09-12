import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovideDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entities/genre.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private readonly movieDetailRepository: Repository<MovieDetail>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  // 모든 영화 목록을 반환하는 메서드
  async findAll(title?: string) {
    if (!title) {
      return await this.movieRepository.find({
        relations: ['director', 'detail', 'genres'],
      });
    }
    return await this.movieRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
      relations: ['director', 'detail', 'genres'],
    });
  }

  // 특정 ID 값을 가진 영화를 반환하는 메서드
  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail', 'director', 'genres'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    return movie;
  }

  // 새로운 영화를 생성하는 메서드
  async create(createMovieDto: CreateMovieDto) {
    const director = await this.directorRepository.findOne({
      where: { id: createMovieDto.directorId },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 ID 값의 감독입니다.');
    }

    const genres = await this.genreRepository.find({
      where: { id: In(createMovieDto.genreIds) },
    });

    if (genres.length !== createMovieDto.genreIds.length) {
      throw new NotFoundException(
        `존재하지 않는 ID 값의 장르가 포함되어 있습니다. ids -> ${genres
          .map((genre) => genre.id)
          .join(', ')}`,
      );
    }

    const movie = await this.movieRepository.save({
      title: createMovieDto.title,
      detail: {
        detail: createMovieDto.detail,
      },
      director,
      genres,
    });

    return movie;
  }

  // 특정 ID 값을 가진 영화를 수정하는 메서드
  async update(id: number, updateMovieDto: UpdateMovideDto) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    const { detail, directorId, genreIds, ...movieRest } = updateMovieDto;

    let newDirector;

    if (directorId) {
      const director = await this.directorRepository.findOne({
        where: { id: directorId },
      });

      if (!director) {
        throw new NotFoundException('존재하지 않는 ID 값의 감독입니다.');
      }

      newDirector = director;
    }

    let newGenres;
    if (genreIds) {
      const genres = await this.genreRepository.find({
        where: { id: In(genreIds) },
      });

      if (genres.length !== updateMovieDto.genreIds.length) {
        throw new NotFoundException(
          `존재하지 않는 ID 값의 장르가 포함되어 있습니다. ids -> ${genres
            .map((genre) => genre.id)
            .join(', ')}`,
        );
      }

      newGenres = genres;
    }

    const movieUpdateFields = {
      ...movieRest,
      ...(newDirector && { director: newDirector }),
    };

    await this.movieRepository.update({ id }, movieUpdateFields);

    if (detail) {
      await this.movieDetailRepository.update(
        { id: movie.detail.id },
        { detail },
      );
    }

    const newMovie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail', 'director'],
    });

    newMovie.genres = newGenres;

    await this.movieRepository.save(newMovie);

    return await this.movieRepository.findOne({
      where: { id },
      relations: ['detail', 'director', 'genres'],
    });
  }

  // 특정 ID 값을 가진 영화를 삭제하는 메서드
  async remove(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    await this.movieRepository.delete({ id });
    await this.movieDetailRepository.delete({ id: movie.detail.id });

    return { id };
  }
}

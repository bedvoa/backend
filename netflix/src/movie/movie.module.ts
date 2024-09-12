import { Movie } from './entity/movie.entity';
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieDetail, Director, Genre])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}

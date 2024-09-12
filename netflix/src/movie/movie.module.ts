import { Movie } from './entity/movie.entity';
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieDetail } from './entity/movie-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieDetail])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}

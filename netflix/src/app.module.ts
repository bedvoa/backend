import * as joi from 'joi';
import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVariables } from './constants/env-variables';
import { Movie } from './movie/entity/movie.entity';
import { MovieDetail } from './movie/entity/movie-detail.entity';
import { DirectorModule } from './director/director.module';
import { Director } from './director/entity/director.entity';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entities/genre.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        ENV: joi.string().valid('dev', 'prod').default('dev'),
        DB_TYPE: joi.string().valid('postgres').required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DATABASE: joi.string().required(),
        HASH_ROUNDS: joi.number().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>(
          EnvVariables.DB_TYPE,
        ) as EnvVariables.KIND_OF_DB,
        host: configService.get<string>(EnvVariables.DB_HOST),
        port: configService.get<number>(EnvVariables.DB_PORT),
        username: configService.get<string>(EnvVariables.DB_USERNAME),
        password: configService.get<string>(EnvVariables.DB_PASSWORD),
        database: configService.get<string>(EnvVariables.DB_DATABASE),
        entities: [Movie, MovieDetail, Director, Genre, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MovieModule,
    DirectorModule,
    GenreModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import * as joi from 'joi';
import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Movie } from './movie/entity/movie.entity';
import { MovieDetail } from './movie/entity/movie-detail.entity';
import { DirectorModule } from './director/director.module';
import { Director } from './director/entity/director.entity';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entities/genre.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { EnvVariableKeys } from './common/const/env.const';

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
        ACCESS_TOKEN_SECRET: joi.string().required(),
        REFRESH_TOKEN_SECRET: joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>(EnvVariableKeys.dbType) as 'postgres',
        host: configService.get<string>(EnvVariableKeys.dbHost),
        port: configService.get<number>(EnvVariableKeys.dbPort),
        username: configService.get<string>(EnvVariableKeys.dbUsername),
        password: configService.get<string>(EnvVariableKeys.dbPassword),
        database: configService.get<string>(EnvVariableKeys.dbDatabase),
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

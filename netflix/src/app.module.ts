import * as joi from 'joi';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { BearerTokenMiddleware } from './auth/middleware/bearer-token.middleware';
import { AuthGuard } from './auth/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RBACGuard } from './auth/guard/rbac.guard';

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
  providers: [
    // guard는 provider에 등록한 순서대로 동작함
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // 가장 먼저 실행
    },
    {
      provide: APP_GUARD,
      useClass: RBACGuard, // AuthGuard 다음에 실행
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}

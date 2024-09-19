import * as redisStore from 'cache-manager-ioredis';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3305,
      username: 'root',
      password: 'mysql',
      database: 'redis_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Board]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6378,
      ttl: 60,
    }),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class AppModule {}

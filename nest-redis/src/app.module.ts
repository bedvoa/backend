import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';

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
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

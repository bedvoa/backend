import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getBoards(page: number, size: number): Promise<Board[]> {
    /// Cache Aside Pattern
    // redis에 캐싱이 되어 있으면 캐싱값 반환
    const cacheKey = `boards:page:${page}:size:${size}`;
    const cachedData = await this.cacheManager.get<Board[]>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const skip = (page - 1) * size;
    const boards = await this.boardRepository.find({
      order: { createdAt: 'DESC' },
      skip,
      take: size,
    });

    /// Write Around Cache Pattern
    // redis에 캐싱이 안되어 있으면 새로 캐싱
    await this.cacheManager.set(cacheKey, boards);

    return boards;
  }
}

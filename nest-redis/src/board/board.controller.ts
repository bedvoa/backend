import { Controller, Get, Query } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('boards')
  async getBoards(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    return await this.boardService.getBoards(page, size);
  }
}

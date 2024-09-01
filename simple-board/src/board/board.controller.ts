import { BoardService } from './board.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Post()
  create(newBoard: { title: string; content: string }): {
    title: string;
    content: string;
  } {
    return this.boardService.create(newBoard);
  }
}

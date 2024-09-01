import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  boards = [];

  findAll() {
    return this.boards;
  }

  create(newBoard: { title: string; content: string }): {
    title: string;
    content: string;
  } {
    this.boards.push(newBoard);
    return newBoard;
  }
}

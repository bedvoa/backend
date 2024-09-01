import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from '../board.service';

describe('BoardService', () => {
  let boardService: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
  });

  describe('findAll', () => {
    // 성공 케이스
    it('should return "This action returns all board"', () => {
      // given
      const result = [
        {
          title: 'new board',
          content: 'new board content',
        },
      ];

      // when
      jest.spyOn(boardService, 'findAll').mockReturnValue(result);

      // then
      expect(boardService.findAll()).toEqual(result);
    });

    // 실패 케이스
    // 실패 케이스는 나중에
  });

  describe('create', () => {
    // 성공 케이스
    it('should return new board', () => {
      // given
      const newBoard = {
        title: 'new board',
        content: 'new board content',
      };

      // when
      const result = boardService.create(newBoard);

      // then
      expect(result).toEqual(newBoard);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from '../board.controller';
import { BoardService } from '../board.service';

describe('BoardController', () => {
  let boardController: BoardController;
  let boardService: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useValue: {
            findAll: () => jest.fn().mockReturnValue([]),
            create: jest.fn().mockImplementation((newBoard) => newBoard),
          },
        },
      ],
    }).compile();

    boardController = module.get<BoardController>(BoardController);
    boardService = module.get<BoardService>(BoardService);
  });

  describe('GET /board', () => {
    // 성공 케이스
    it('should return an array of boards', () => {
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
      expect(boardController.findAll()).toEqual(result);
    });

    // 실패 케이스
  });

  describe('POST /board', () => {
    // 성공 케이스
    it('should return "This action adds a new board"', () => {
      // given
      const newBoard = {
        title: 'new board',
        content: 'new board content',
      };

      // when
      const result = boardController.create(newBoard);

      // then
      expect(result).toEqual(newBoard);
    });
  });
});

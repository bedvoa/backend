import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const service: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    appService = service.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!!');
    });
  });

  describe('getNumber', () => {
    it('should return greater than 0', () => {
      expect(appService.getNumber()).toBeGreaterThan(0);
    });

    it('should return 1', () => {
      expect(appService.getNumber()).toBe(1);
    });
  });
});

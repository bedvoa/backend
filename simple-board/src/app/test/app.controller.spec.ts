import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    // mock the AppService
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "Hello World!!"', () => {
      expect(appController.getHello()).toBe('Hello World!!');
    });
  });

  describe('getNumber', () => {
    it('should return greater than 0', () => {
      expect(appController.getNumber()).toBeGreaterThan(0);
    });

    it('should return 1', () => {
      expect(appController.getNumber()).toBe(1);
    });
  });
});

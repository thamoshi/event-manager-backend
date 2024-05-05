import { Test, TestingModule } from '@nestjs/testing';
import { LocalTypeController } from './local-type.controller';
import { LocalTypeService } from './local-type.service';

describe('LocalTypeController', () => {
  let controller: LocalTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalTypeController],
      providers: [LocalTypeService],
    }).compile();

    controller = module.get<LocalTypeController>(LocalTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

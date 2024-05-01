import { Test, TestingModule } from '@nestjs/testing';
import { LocalTypeService } from './local-type.service';

describe('LocalTypeService', () => {
  let service: LocalTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalTypeService],
    }).compile();

    service = module.get<LocalTypeService>(LocalTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

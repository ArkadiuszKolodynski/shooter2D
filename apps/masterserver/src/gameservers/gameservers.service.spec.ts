import { Test, TestingModule } from '@nestjs/testing';
import { GameserversService } from './gameservers.service';

describe('GameserversService', () => {
  let service: GameserversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameserversService],
    }).compile();

    service = module.get<GameserversService>(GameserversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

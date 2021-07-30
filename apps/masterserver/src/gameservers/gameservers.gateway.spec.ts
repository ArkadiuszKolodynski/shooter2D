import { Test, TestingModule } from '@nestjs/testing';
import { GameserversGateway } from './gameservers.gateway';
import { GameserversService } from './gameservers.service';

describe('GameserversGateway', () => {
  let gateway: GameserversGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameserversGateway, GameserversService],
    }).compile();

    gateway = module.get<GameserversGateway>(GameserversGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

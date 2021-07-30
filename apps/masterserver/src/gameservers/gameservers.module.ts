import { GameserversGateway } from './gameservers.gateway';
import { GameserversRepository } from './repositories/gameservers.repository';
import { GameserversService } from './gameservers.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GameserversGateway, GameserversRepository, GameserversService],
  exports: [GameserversService],
})
export class GameserversModule {}

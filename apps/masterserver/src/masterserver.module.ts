import { GameserversModule } from './gameservers/gameservers.module';
import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { SignalModule } from './signal/signal.module';

@Module({
  imports: [PlayersModule, GameserversModule, SignalModule],
})
export class MasterServerModule {}

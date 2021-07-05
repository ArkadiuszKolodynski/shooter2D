import { GameserversModule } from '../gameservers/gameservers.module';
import { Module } from '@nestjs/common';
import { PlayersModule } from '../players/players.module';
import { SignalGateway } from './signal.gateway';
import { SignalService } from './signal.service';

@Module({
  imports: [GameserversModule, PlayersModule],
  providers: [SignalGateway, SignalService],
})
export class SignalModule {}

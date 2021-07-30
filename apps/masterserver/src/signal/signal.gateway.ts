import { PLAYER_SIGNAL, SERVER_SIGNAL } from '@shooter2D/shared/events';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { GameserverSignalDataDto } from './dto/gamerserver-signal-data.dto';
import { PlayerSignalDataDto } from './dto/player-signal-data.dto';
import { SignalService } from './signal.service';
import { Socket } from 'ws';

@WebSocketGateway()
export class SignalGateway {
  constructor(private readonly signalService: SignalService) {}

  @SubscribeMessage(PLAYER_SIGNAL)
  handlePlayerSignal(socket: Socket, playerSignalDataDto: PlayerSignalDataDto): void {
    this.signalService.providePlayerSignalDataToServer(socket.id, playerSignalDataDto);
  }

  @SubscribeMessage(SERVER_SIGNAL)
  handleServerSignal(socket: Socket, gameserverSignalDataDto: GameserverSignalDataDto): void {
    this.signalService.provideServerSignalDataToPlayer(socket.id, gameserverSignalDataDto);
  }
}

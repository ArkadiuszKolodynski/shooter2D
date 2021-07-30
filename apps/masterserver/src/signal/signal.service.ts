import { PLAYER_SIGNAL, SERVER_SIGNAL } from '@shooter2D/shared/events';

import { GameserverSignalDataDto } from './dto/gamerserver-signal-data.dto';
import { GameserversService } from '../gameservers/gameservers.service';
import { Injectable } from '@nestjs/common';
import { PlayerSignalDataDto } from './dto/player-signal-data.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class SignalService {
  constructor(
    private readonly gameserversService: GameserversService,
    private readonly playersService: PlayersService,
  ) {}

  public provideServerSignalDataToPlayer(serverId: string, gameserverSignalDataDto: GameserverSignalDataDto): void {
    const playerSocket = this.playersService.findOne(gameserverSignalDataDto.playerId)?.socket;
    if (!playerSocket) throw new Error('Come on!');
    playerSocket.send(JSON.stringify({ event: SERVER_SIGNAL, data: { serverId, data: gameserverSignalDataDto.data } }));
  }

  public providePlayerSignalDataToServer(playerId: string, playerSignalDataDto: PlayerSignalDataDto): void {
    const serverSocket = this.gameserversService.findOne(playerSignalDataDto.serverId)?.socket;
    if (!serverSocket) throw new Error('Come on!');
    serverSocket.send(JSON.stringify({ event: PLAYER_SIGNAL, data: { playerId, data: playerSignalDataDto.data } }));
  }
}

import { CONNECTION_ACK, PLAYER_CONNECTION } from '@shooter2D/shared/events';
import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { PlayersService } from './players.service';
import { Socket } from 'ws';
import { SocketType } from '../enums/socket-type.enum';
import { WsEmptyResponse } from '@shooter2D/shared/interfaces';

@WebSocketGateway()
export class PlayersGateway implements OnGatewayDisconnect {
  constructor(private readonly playersService: PlayersService) {}

  handleDisconnect(socket: Socket) {
    if (socket.type === SocketType.PLAYER) {
      this.playersService.delete(socket.id);
    }
  }

  @SubscribeMessage(PLAYER_CONNECTION)
  handlePlayerConnection(socket: Socket): WsEmptyResponse {
    this.playersService.create(socket);
    return { event: CONNECTION_ACK };
  }
}

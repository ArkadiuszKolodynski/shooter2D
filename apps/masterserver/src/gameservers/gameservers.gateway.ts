import { CONNECTION_ACK, GAMESERVER_CONNECTION, RETRIEVE_SERVERLIST, SERVERLIST } from '@shooter2D/shared/events';
import { GameServerInfo, GameServerInfoId, WsEmptyResponse } from '@shooter2D/shared/interfaces';
import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';

import { GameserversService } from './gameservers.service';
import { Socket } from 'ws';
import { SocketType } from '../enums/socket-type.enum';

@WebSocketGateway()
export class GameserversGateway implements OnGatewayDisconnect {
  constructor(private readonly gameserversService: GameserversService) {}

  handleDisconnect(socket: Socket) {
    if (socket.type === SocketType.SERVER) {
      this.gameserversService.delete(socket.id);
    }
  }

  @SubscribeMessage(GAMESERVER_CONNECTION)
  handleGameServerConnection(socket: Socket, gameServerInfo: GameServerInfo): WsEmptyResponse {
    this.gameserversService.create(socket, gameServerInfo);
    return { event: CONNECTION_ACK };
  }

  @SubscribeMessage(RETRIEVE_SERVERLIST)
  handleRetrieveServerList(): WsResponse<GameServerInfoId[]> {
    return {
      event: SERVERLIST,
      data: this.gameserversService.findAll().map((gameserver) => ({ id: gameserver.id, ...gameserver.info })),
    };
  }
}

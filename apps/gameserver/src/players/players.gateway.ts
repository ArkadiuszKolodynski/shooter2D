import { WebSocketGateway } from '@nestjs/websockets';
import { PlayersService } from './players.service';

@WebSocketGateway()
export class PlayersGateway {
  constructor(private readonly playersService: PlayersService) {}
}

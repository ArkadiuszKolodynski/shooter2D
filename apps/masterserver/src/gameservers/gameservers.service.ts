import { GameServerInfo } from '@shooter2D/shared/interfaces';
import { Gameserver } from './entities/gameserver.entity';
import { GameserversRepository } from './repositories/gameservers.repository';
import { Injectable } from '@nestjs/common';
import { Socket } from 'ws';
import { SocketType } from '../enums/socket-type.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameserversService {
  constructor(private readonly gameserversRepository: GameserversRepository) {}

  create(socket: Socket, gameserverInfo: GameServerInfo): boolean {
    const id = uuidv4();
    socket.id = id;
    socket.type = SocketType.SERVER;
    const gameserver = new Gameserver(id, gameserverInfo, socket);
    return this.gameserversRepository.create(gameserver);
  }

  findAll(): Gameserver[] {
    return this.gameserversRepository.findAll();
  }

  findOne(id: string): Gameserver {
    return this.gameserversRepository.findOne(id);
  }

  delete(id: string): boolean {
    return this.gameserversRepository.delete(id);
  }
}

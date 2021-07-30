import { Injectable } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { PlayersRepository } from './repositories/players.repository';
import { Socket } from 'ws';
import { SocketType } from '../enums/socket-type.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  create(socket: Socket): boolean {
    const id = uuidv4();
    socket.id = id;
    socket.type = SocketType.PLAYER;
    const player = new Player(id, socket);
    return this.playersRepository.create(player);
  }

  findAll(): Player[] {
    return this.playersRepository.findAll();
  }

  findOne(id: string): Player {
    return this.playersRepository.findOne(id);
  }

  delete(id: string): boolean {
    return this.playersRepository.delete(id);
  }
}

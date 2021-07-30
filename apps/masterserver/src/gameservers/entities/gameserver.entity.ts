import { GameServerInfo } from '@shooter2D/shared/interfaces';
import { Socket } from 'ws';

export class Gameserver {
  private readonly _id: string;
  private readonly _info: GameServerInfo;
  private readonly _socket: Socket;

  constructor(id: string, info: GameServerInfo, socket: Socket) {
    this._id = id;
    this._info = info;
    this._socket = socket;
  }

  public get id(): string {
    return this._id;
  }

  public get info(): GameServerInfo {
    return this._info;
  }

  public get socket(): Socket {
    return this._socket;
  }
}

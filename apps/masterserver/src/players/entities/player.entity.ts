import { Socket } from 'ws';

export class Player {
  private readonly _id: string;
  private readonly _socket: Socket;

  constructor(id: string, socket: Socket) {
    this._id = id;
    this._socket = socket;
  }

  public get id(): string {
    return this._id;
  }

  public get socket(): Socket {
    return this._socket;
  }
}

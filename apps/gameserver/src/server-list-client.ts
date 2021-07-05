import { GAMESERVER_CONNECTION, PLAYER_SIGNAL, SERVER_SIGNAL } from '@shooter2D/shared/events';

import { ConfigService } from '@nestjs/config';
import { GameServerInfo } from '@shooter2D/shared/interfaces';
import Peer from 'simple-peer';
import WebSocket from 'ws';
import wrtc from 'wrtc';

export class ServerListClient {
  constructor(private configService: ConfigService) {
    this.connect();
  }

  private connect(): void {
    let id;
    const ws = new WebSocket('ws://127.0.0.1:3000');
    const peer = new Peer({ wrtc });

    ws.on('open', (): void => {
      const serverInfo: GameServerInfo = {
        name: this.configService.get<string>('name'),
        port: this.configService.get<number>('port'),
        slots: this.configService.get<number>('slots'),
      };
      console.log('connected');
      ws.send(JSON.stringify({ event: GAMESERVER_CONNECTION, data: serverInfo }));
    });

    ws.on('message', (message: string): void => {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.event === PLAYER_SIGNAL) {
        id = parsedMessage.data.playerId;
        peer.signal(parsedMessage.data['data']);
      }
    });

    ws.on('error', (err: Error) => {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      ws.close();
    });

    ws.on('close', (code: number, reason: string): void => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', reason);
      setTimeout((): void => this.connect(), 1000);
    });

    peer.on('connect', () => {
      console.log('CONNECT');
      peer.send('whatever' + Math.random());
    });

    peer.on('close', () => {
      console.log('peer connection closed');
    });

    peer.on('data', (data) => {
      console.log('data: ' + data);
    });

    peer.on('error', (err) => console.log('error', err));

    peer.on('signal', (data) => {
      console.log('SIGNAL', JSON.stringify(data));
      ws.send(JSON.stringify({ event: SERVER_SIGNAL, data: { playerId: id, data } }));
    });
  }
}

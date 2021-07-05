import { INestApplicationContext, WebSocketAdapter, WsMessageHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import Peer from 'simple-peer';
import wrtc from 'wrtc';

export class WebRtcAdapter implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) {}

  create(port: number, options?: any): any {
    const peer = new Peer({ wrtc, ...options });
    peer.on('signal', (data) => {
      // peer2
    });
    return peer;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bindClientConnect(server: any, callback: Function) {
    callback();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bindClientDisconnect?(client: any, callback: Function) {
    null;
  }

  bindMessageHandlers(client: any, handlers: WsMessageHandler<string>[], transform: (data: any) => Observable<any>) {
    null;
  }

  close(server: any) {
    server.close();
  }
}

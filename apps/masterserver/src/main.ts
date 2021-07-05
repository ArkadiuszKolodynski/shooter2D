import { MasterServerModule } from './masterserver.module';
import { NestFactory } from '@nestjs/core';
import { SocketType } from './enums/socket-type.enum';
import { WsAdapter } from '@nestjs/platform-ws';

declare module 'ws' {
  class _WS extends WebSocket {}
  export interface Socket extends _WS {
    id: string;
    type: SocketType;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(MasterServerModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();

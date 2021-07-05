import { ConfigService } from '@nestjs/config';
import { Game } from './game';
import { GameserverModule } from './gameserver.module';
import { NestFactory } from '@nestjs/core';
import { ServerListClient } from './server-list-client';
import { WebRtcAdapter } from './adapters/webrtc-adapter';

async function bootstrap() {
  const app = await NestFactory.create(GameserverModule);
  app.useWebSocketAdapter(new WebRtcAdapter(app));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
  new Game().run();
  new ServerListClient(configService);
}
bootstrap();

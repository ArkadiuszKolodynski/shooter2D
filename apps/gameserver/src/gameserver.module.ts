import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import configuration from '../config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), PlayersModule],
  providers: [AppGateway],
})
export class GameserverModule {
  static asdf() {
    return null;
  }
}

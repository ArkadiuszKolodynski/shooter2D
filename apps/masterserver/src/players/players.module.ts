import { Module } from '@nestjs/common';
import { PlayersGateway } from './players.gateway';
import { PlayersRepository } from './repositories/players.repository';
import { PlayersService } from './players.service';

@Module({
  providers: [PlayersGateway, PlayersRepository, PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}

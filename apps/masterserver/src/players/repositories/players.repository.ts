import { Injectable } from '@nestjs/common';
import { Player } from '../entities/player.entity';

type PlayersCollection = Record<string, Player>;

@Injectable()
export class PlayersRepository {
  private readonly players: PlayersCollection = {};

  public create(player: Player): boolean {
    this.players[player.id] = player;
    return true;
  }

  public findAll(): Player[] {
    return Object.keys(this.players).map((id) => this.players[id]);
  }

  public findOne(id: string): Player {
    return this.players[id];
  }

  public delete(id: string): boolean {
    delete this.players[id];
    return true;
  }
}

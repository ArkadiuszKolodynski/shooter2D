import { Gameserver } from '../entities/gameserver.entity';
import { Injectable } from '@nestjs/common';

type GameserversCollection = Record<string, Gameserver>;

@Injectable()
export class GameserversRepository {
  private readonly gameservers: GameserversCollection = {};

  public create(gameserver: Gameserver): boolean {
    this.gameservers[gameserver.id] = gameserver;
    return true;
  }

  public findAll(): Gameserver[] {
    return Object.keys(this.gameservers)
      .map((id) => this.gameservers[id])
      .sort((a, b) => a.info.name.localeCompare(b.info.name));
  }

  public findOne(id: string): Gameserver {
    return this.gameservers[id];
  }

  public delete(id: string): boolean {
    delete this.gameservers[id];
    return true;
  }
}

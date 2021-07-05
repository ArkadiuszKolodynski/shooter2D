import type * as PIXI from 'pixi.js';

export abstract class GameObject {
  public readonly sprite: PIXI.Sprite;

  public getCoords(): { x: number; y: number } {
    const { x, y } = this.sprite.position;
    return { x, y };
  }
}

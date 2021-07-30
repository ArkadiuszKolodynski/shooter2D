import * as PIXI from 'pixi.js';

import { AppSingleton } from './AppSingleton';
import { MovableGameObject } from '../interfaces/MovableGameObject';
import type { Player } from './Player';

export class Bullet extends MovableGameObject {
  readonly sprite: PIXI.Sprite;
  readonly owner: Player;
  readonly vy = 12;

  constructor(owner: Player) {
    super();
    this.owner = owner;
    const texture = PIXI.Loader.shared.resources['/assets/spritesheet.json']['textures']['bullet.png'] as PIXI.Texture;
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.15);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(
      this.owner.sprite.x + 35 * Math.cos(this.owner.sprite.rotation) - 12 * Math.sin(this.owner.sprite.rotation),
      this.owner.sprite.y + 35 * Math.sin(this.owner.sprite.rotation) + 12 * Math.cos(this.owner.sprite.rotation),
    );
    this.sprite.rotation = this.owner.sprite.rotation;
    this.sprite.tint = 0x000000;
    AppSingleton.getInstance().stage.addChild(this.sprite);
  }
}

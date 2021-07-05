import * as PIXI from 'pixi.js';

import { APP_HEIGHT, APP_WIDTH } from './Config';

import { AppSingleton } from './AppSingleton';
import { Bullets } from './Bullets';
import { InputHandler } from './InputHandler';
import { Player } from './Player';
import { capitalize } from '@shooter2D/shared/utils/StringUtils';

export class Game {
  static enemies: Player[] = [];
  localPlayer: Player;

  playerWeapon: PIXI.Text;
  playerAmmo: PIXI.Text;

  constructor(gameWindow: HTMLDivElement) {
    if (PIXI.Loader.shared.resources['/assets/spritesheet.json'] === undefined) {
      PIXI.Loader.shared.add('/assets/spritesheet.json').load(() => this.setup(gameWindow));
    } else {
      this.setup(gameWindow);
    }
  }

  private setup(gameWindow: HTMLDivElement): void {
    const app = AppSingleton.getInstance();
    gameWindow.appendChild(app.view);
    this.localPlayer = new Player();
    app.stage.addChild(this.localPlayer.sprite);
    Game.enemies.forEach((enemy) => app.stage.addChild(enemy.sprite));
    const playerName = new PIXI.Text(this.localPlayer.name);
    app.stage.addChild(playerName);
    const playerHp = new PIXI.Text(`HP: ${this.localPlayer.currentHealth}`);
    playerHp.anchor.set(1, 0);
    playerHp.position.set(APP_WIDTH, 0);
    app.stage.addChild(playerHp);
    this.playerAmmo = new PIXI.Text(
      `Ammo: ${this.localPlayer.currentWeapon.currentAmmoInMag}/${this.localPlayer.currentWeapon.currentAmmoInBackpack}`,
    );
    this.playerAmmo.anchor.set(1, 0);
    this.playerAmmo.position.set(APP_WIDTH, playerHp.height);
    app.stage.addChild(this.playerAmmo);
    this.playerWeapon = new PIXI.Text(`${capitalize(this.localPlayer.currentWeapon.weaponType)}`);
    this.playerWeapon.anchor.set(1, 0);
    this.playerWeapon.position.set(APP_WIDTH, this.playerWeapon.height + playerHp.height);
    app.stage.addChild(this.playerWeapon);
    app.ticker.add((delta) => this.gameLoop(delta));
  }

  private gameLoop(delta: number): void {
    this.playerWeapon.text = `${capitalize(this.localPlayer.currentWeapon.weaponType)}`;
    this.playerAmmo.text = `Ammo: ${this.localPlayer.currentWeapon.currentAmmoInMag}/${this.localPlayer.currentWeapon.currentAmmoInBackpack}`;
    InputHandler.handleInput(this.localPlayer);
    Bullets.bullets = Bullets.bullets.filter((bullet) => {
      bullet.moveForward();
      if (
        bullet.sprite.x >= 30 &&
        bullet.sprite.x <= APP_WIDTH - 30 &&
        bullet.sprite.y >= 30 &&
        bullet.sprite.y <= APP_HEIGHT - 30
      ) {
        return true;
      }
      AppSingleton.getInstance().stage.removeChild(bullet.sprite);
      return false;
    });
  }
}

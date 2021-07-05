import * as PIXI from 'pixi.js';

import { APP_HEIGHT, APP_WIDTH } from './Config';
import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator';

import type { Animatable } from '../interfaces/Animatable';
import type { BaseWeapon } from './BaseWeapon';
import { MovableGameObject } from '../interfaces/MovableGameObject';
import { MovementState } from './MovementState';
import { OnChange } from 'on-property-change';
import { Pistol } from './Pistol';
import { Rifle } from './Rifle';
import type { WeaponType } from './WeaponType';

export class Player extends MovableGameObject implements Animatable {
  public readonly maxHealth = 100;
  public readonly name = uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: '', style: 'capital' });
  public readonly weapons = [new Rifle(this), new Pistol(this)];

  private _busy = false;
  private _currentHealth = this.maxHealth;
  private _currentWeapon = this.weapons[0];
  public readonly sprite = this.initSprite();

  public get busy(): boolean {
    return this._busy;
  }

  public get currentHealth(): number {
    return this._currentHealth;
  }

  public get currentWeapon(): BaseWeapon {
    return this._currentWeapon;
  }

  @OnChange('_busy')
  @OnChange('_currentWeapon')
  @OnChange('state')
  private handeAnimationChange() {
    if (!this.busy && this.currentWeapon && this.sprite && this.state) {
      this.playAnimation(`player_${this.state}_${this.currentWeapon.weaponType}`, { busy: false });
    }
  }

  public shoot(): void {
    if (this.currentWeapon.haveAmmoInMag() && !this.busy) {
      this.playAnimation(`player_shoot_${this.currentWeapon.weaponType}`, { busy: true });
      this.currentWeapon.fire();
    } else if (!this.currentWeapon.haveAmmoInMag()) {
      this.reload();
    }
  }
  public reload(): void {
    if (!this.currentWeapon.magIsFull() && this.currentWeapon.haveAmmoInBackpack()) {
      this.playAnimation(`player_reload_${this.currentWeapon.weaponType}`, { busy: true });
      this.currentWeapon.reload();
    }
  }
  public changeWeapon(weaponType: WeaponType): void {
    this._currentWeapon = this.weapons.find((weapon) => weapon.weaponType === weaponType);
  }

  public setIdle(): void {
    this.state = MovementState.IDLE;
  }

  private initSprite(): PIXI.AnimatedSprite {
    const sprite = new PIXI.AnimatedSprite(
      PIXI.Loader.shared.resources['/assets/spritesheet.json']['spritesheet']['animations'][
        `player_${this.state}_${this.currentWeapon.weaponType}`
      ],
    );
    sprite.position.set(APP_WIDTH / 2, APP_HEIGHT / 2);
    sprite.anchor.set(0.5);
    sprite.scale.set(0.25, 0.25);
    sprite.angle -= 90;
    sprite.animationSpeed = 0.5;
    sprite.onComplete = () => (this._busy = false);
    sprite.play();
    // this.sprite.tint = 0x80ff80;
    return sprite;
  }

  playAnimation(animationName: string, options?: any) {
    const { busy }: { busy: boolean } = options;
    this._busy = busy;
    this.sprite.stop();
    this.sprite.textures =
      PIXI.Loader.shared.resources['/assets/spritesheet.json']['spritesheet']['animations'][animationName];
    this.sprite.loop = !busy;
    this.sprite.play();
  }
}

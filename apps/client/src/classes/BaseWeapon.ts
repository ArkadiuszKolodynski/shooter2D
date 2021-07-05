import { Bullet } from './Bullet';
import { Bullets } from './Bullets';
import type { Player } from './Player';
import type { Weapon } from '../interfaces/Weapon';
import type { WeaponType } from './WeaponType';

export abstract class BaseWeapon implements Weapon {
  abstract reloadTime: number;
  abstract weaponType: WeaponType;
  abstract maxAmmoInBackpack: number;
  abstract maxAmmoInMag: number;
  abstract currentAmmoInBackpack: number;
  abstract currentAmmoInMag: number;
  private owner: Player;

  constructor(owner: Player) {
    this.owner = owner;
  }

  public fire(): void {
    this.currentAmmoInMag -= 1;
    this.spawnBullet();
  }

  public reload(): void {
    let maxAmmo = this.currentAmmoInBackpack + this.currentAmmoInMag;
    if (maxAmmo < this.maxAmmoInMag) {
      this.currentAmmoInMag = maxAmmo;
      this.currentAmmoInBackpack = 0;
    } else {
      this.currentAmmoInMag = this.maxAmmoInMag;
      maxAmmo -= this.maxAmmoInMag;
      this.currentAmmoInBackpack = maxAmmo;
    }
  }

  public haveAmmoInMag(): boolean {
    return this.currentAmmoInMag > 0;
  }

  public magIsFull(): boolean {
    return this.currentAmmoInMag === this.maxAmmoInMag;
  }

  public haveAmmoInBackpack(): boolean {
    return this.currentAmmoInBackpack > 0;
  }

  public haveAmmo(): boolean {
    return this.currentAmmoInMag > 0 || this.currentAmmoInBackpack > 0;
  }

  protected spawnBullet(): void {
    const bullet = new Bullet(this.owner);
    Bullets.bullets.push(bullet);
  }
}

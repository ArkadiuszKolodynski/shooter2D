import { BaseWeapon } from './BaseWeapon';
import { InputHandler } from './InputHandler';
import { WeaponType } from './WeaponType';

export class Pistol extends BaseWeapon {
  maxAmmoInBackpack = 45;
  maxAmmoInMag = 9;
  currentAmmoInBackpack = this.maxAmmoInBackpack - this.maxAmmoInMag;
  currentAmmoInMag = this.maxAmmoInMag;
  reloadTime = 0.5;
  weaponType = WeaponType.PISTOL;
  private fired = false;

  public fire(): void {
    if (!this.fired) {
      this.currentAmmoInMag -= 1;
      this.spawnBullet();
    }
    this.fired = InputHandler.isPressed('Space');
  }
}

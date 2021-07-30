import { BaseWeapon } from './BaseWeapon';
import { WeaponType } from './WeaponType';

export class Rifle extends BaseWeapon {
  maxAmmoInBackpack = 120;
  maxAmmoInMag = 30;
  currentAmmoInBackpack = this.maxAmmoInBackpack - this.maxAmmoInMag;
  currentAmmoInMag = this.maxAmmoInMag;
  reloadTime = 0.5;
  weaponType = WeaponType.RIFLE;
}

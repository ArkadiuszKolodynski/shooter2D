export interface Weapon {
  fire(): void;
  reload(): void;
  haveAmmoInMag(): boolean;
  magIsFull(): boolean;
  haveAmmoInBackpack(): boolean;
  haveAmmo(): boolean;
}

import type { Player } from './Player';
import { WeaponType } from './WeaponType';

export class InputHandler {
  private static pressedKeys: Record<string, boolean> = {};

  public static handleInput(player: Player): void {
    if (
      !InputHandler.pressedKeys['KeyW'] &&
      !InputHandler.pressedKeys['ArrowUp'] &&
      !InputHandler.pressedKeys['KeyS'] &&
      !InputHandler.pressedKeys['ArrowDown'] &&
      !InputHandler.pressedKeys['KeyQ'] &&
      !InputHandler.pressedKeys['KeyE']
    ) {
      player.setIdle();
    }
    if (InputHandler.pressedKeys['KeyW'] || InputHandler.pressedKeys['ArrowUp']) {
      player.moveForward();
    }
    if (InputHandler.pressedKeys['KeyS'] || InputHandler.pressedKeys['ArrowDown']) {
      player.moveBackward();
    }
    if (InputHandler.pressedKeys['KeyA'] || InputHandler.pressedKeys['ArrowLeft']) {
      player.rotateLeft();
    }
    if (InputHandler.pressedKeys['KeyD'] || InputHandler.pressedKeys['ArrowRight']) {
      player.rotateRight();
    }
    if (InputHandler.pressedKeys['KeyQ']) {
      player.moveLeft();
    }
    if (InputHandler.pressedKeys['KeyE']) {
      player.moveRight();
    }
    if (InputHandler.pressedKeys['KeyR']) {
      player.reload();
    }
    if (InputHandler.pressedKeys['Digit1']) {
      player.changeWeapon(WeaponType.RIFLE);
    }
    if (InputHandler.pressedKeys['Digit2']) {
      player.changeWeapon(WeaponType.PISTOL);
    }
    if (InputHandler.pressedKeys['Space']) {
      player.shoot();
    }
  }

  public static subscribe(): void {
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  public static unsubscribe(): void {
    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keyup', this.keyUp);
  }

  public static isPressed(key: string) {
    return InputHandler.pressedKeys[key];
  }

  private static keyDown(e: KeyboardEvent): void {
    e.preventDefault();
    InputHandler.pressedKeys[e.code] = true;
  }

  private static keyUp(e: KeyboardEvent): void {
    e.preventDefault();
    InputHandler.pressedKeys[e.code] = false;
  }
}

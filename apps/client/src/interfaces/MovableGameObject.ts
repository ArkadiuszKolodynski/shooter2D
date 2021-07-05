import { APP_HEIGHT, APP_WIDTH } from '../classes/Config';

import { GameObject } from './GameObject';
import { MovementState } from '../classes/MovementState';

export abstract class MovableGameObject extends GameObject {
  protected rotationAngle = 3;
  protected state = MovementState.IDLE;
  protected vy = 3;
  protected vx = this.vy / 2;

  public moveForward(): void {
    this.state = MovementState.MOVING;
    const newX = this.sprite.x + this.vy * Math.cos(this.sprite.rotation);
    const newY = this.sprite.y + this.vy * Math.sin(this.sprite.rotation);
    if (newX >= 20 && newX <= APP_WIDTH - 20) this.sprite.x = newX;
    if (newY >= 20 && newY <= APP_HEIGHT - 20) this.sprite.y = newY;
  }
  public moveBackward(): void {
    this.state = MovementState.MOVING;
    const newX = this.sprite.x - this.vy * Math.cos(this.sprite.rotation);
    const newY = this.sprite.y - this.vy * Math.sin(this.sprite.rotation);
    if (newX >= 20 && newX <= APP_WIDTH - 20) this.sprite.x = newX;
    if (newY >= 20 && newY <= APP_HEIGHT - 20) this.sprite.y = newY;
  }
  public moveLeft(): void {
    this.state = MovementState.MOVING;
    const newX = this.sprite.x + this.vx * Math.sin(this.sprite.rotation);
    const newY = this.sprite.y - this.vx * Math.cos(this.sprite.rotation);
    if (newX >= 20 && newX <= APP_WIDTH - 20) this.sprite.x = newX;
    if (newY >= 20 && newY <= APP_HEIGHT - 20) this.sprite.y = newY;
  }
  public moveRight(): void {
    this.state = MovementState.MOVING;
    const newX = this.sprite.x - this.vx * Math.sin(this.sprite.rotation);
    const newY = this.sprite.y + this.vx * Math.cos(this.sprite.rotation);
    if (newX >= 20 && newX <= APP_WIDTH - 20) this.sprite.x = newX;
    if (newY >= 20 && newY <= APP_HEIGHT - 20) this.sprite.y = newY;
  }
  public rotateLeft(): void {
    this.sprite.angle -= this.rotationAngle;
  }
  public rotateRight(): void {
    this.sprite.angle += this.rotationAngle;
  }
}

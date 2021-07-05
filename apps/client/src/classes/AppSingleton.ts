import * as PIXI from 'pixi.js';

import { APP_HEIGHT, APP_WIDTH, BG_COLOR } from './Config';

export class AppSingleton {
  private static instance: PIXI.Application;

  private constructor() {}

  public static getInstance() {
    if (!AppSingleton.instance || !AppSingleton.instance.stage) {
      AppSingleton.instance = new PIXI.Application({
        width: APP_WIDTH,
        height: APP_HEIGHT,
        backgroundColor: BG_COLOR,
      });
    }
    return AppSingleton.instance;
  }
}

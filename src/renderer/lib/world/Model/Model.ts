import Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite } from "Pixi.js";

export default class Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;

  constructor(Game: Game, type: string, coords: Vector) {
    this.position = coords;
    this.sprite = new Game.Pixi.Sprite();
  }

  get leftSide() {
    return 0;
  }
  get rightSide() {
    return 0;
  }
  get topSide() {
    return 0;
  }
  get bottomSide() {
    return 0;
  }

  update() {}
}

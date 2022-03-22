import Game from "renderer/index";
import { ModelTypes } from "renderer/types";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model/Model";
import type { Texture, Sprite } from "pixi.js";

export default class Rock implements Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  constructor(Game: Game, type: ModelTypes, coords: Vector) {
    this.position = new Vector([
      (Game.canvas.offsetWidth / 15) * coords.x,
      (Game.canvas.offsetHeight / 9) * coords.y,
    ]);

    switch (true) {
      case type === ModelTypes.rock:
        this.texture = Game.Assets.rockTexture;
        break;
      default:
        this.texture = Game.Assets.rockTexture;
        break;
    }

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.canvas.offsetWidth / 15;
    this.sprite.height = Game.canvas.offsetHeight / 9;
    Game.Stage.addChild(this.sprite);
  }

  get leftSide() {
    return this.sprite.x;
  }
  get rightSide() {
    return this.sprite.x + this.sprite.width;
  }
  get topSide() {
    return this.sprite.y;
  }
  get bottomSide() {
    return this.sprite.y + this.sprite.height;
  }

  update() {}
}

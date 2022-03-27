import Game from "renderer/index";
import { ModelTypes } from "renderer/types";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model/Model";
import type { Texture, Sprite } from "pixi.js";

export default class Rock implements Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  constructor(Game: Game, type: ModelTypes, roomPos: Vector, roomCoords: Vector) {
    this.position = new Vector([
      (Game.canvas.offsetWidth * roomCoords.x) + (Game.canvas.offsetWidth / 15) * roomPos.x,
      (Game.canvas.offsetHeight * roomCoords.y) + (Game.canvas.offsetHeight / 9) * roomPos.y,
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
    this.sprite.zIndex = Game.zIndex.rock;
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

  playerCollision() {}

  update() {}
}

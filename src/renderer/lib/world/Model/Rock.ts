import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { Texture, Sprite } from "pixi.js";

export default class Rock implements Model {
  position: Vector;
  texture: Texture;
  sprite: Sprite;
  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.position = new Vector([
      Game.canvas.offsetWidth * roomCoords.x +
        (Game.canvas.offsetWidth / 15) * tileCoords.x,
      Game.canvas.offsetHeight * roomCoords.y +
        (Game.canvas.offsetHeight / 9) * tileCoords.y,
    ]);

    this.texture = Game.Assets.rockTexture;

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

  remove() {}

  playerCollision() {}

  update() {}
}

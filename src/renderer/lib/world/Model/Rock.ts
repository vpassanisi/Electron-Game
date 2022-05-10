import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { Texture, Sprite } from "pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";

export default class Rock implements Model {
  position: Vector;
  texture: Texture;
  sprite: Sprite;
  hitbox: PolygonHitbox;

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

    this.hitbox = new PolygonHitbox(Game, [
      new Vector([this.sprite.x, this.sprite.y]),
      new Vector([this.sprite.x + this.sprite.width, this.sprite.y]),
      new Vector([
        this.sprite.x + this.sprite.width,
        this.sprite.y + this.sprite.height,
      ]),
      new Vector([this.sprite.x, this.sprite.y + this.sprite.height]),
    ]);

    Game.Stage.addChild(this.sprite);
  }

  remove() {}

  playerCollision() {}

  update() {}
}

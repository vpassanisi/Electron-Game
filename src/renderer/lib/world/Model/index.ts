import type Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite } from "Pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";

export default class Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: PolygonHitbox;

  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.position = tileCoords;
    this.sprite = new Game.Pixi.Sprite();
    this.hitbox = new PolygonHitbox(Game, {
      verts: [new Vector([]), new Vector([]), new Vector([]), new Vector([])],
    });
  }

  remove() {}

  playerCollision() {}

  update() {}
}

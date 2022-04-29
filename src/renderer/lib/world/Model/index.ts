import Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite } from "Pixi.js";
import Hitbox from "renderer/lib/Hitbox";

export default class Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: Hitbox;

  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.position = tileCoords;
    this.sprite = new Game.Pixi.Sprite();
    this.hitbox = new Hitbox(
      Game,
      new Vector([]),
      new Vector([]),
      new Vector([]),
      new Vector([])
    );
  }

  remove() {}

  playerCollision() {}

  update() {}
}

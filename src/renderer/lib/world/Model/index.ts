import type Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite } from "Pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";
import { Body } from "matter-js";

export default class Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: Body | null;
  room: Room;

  constructor(Game: Game, room: Room, tileCoords: Vector, roomCoords: Vector) {
    this.position = tileCoords;
    this.room = room;
    this.sprite = new Game.Pixi.Sprite();
    this.hitbox = null;
  }

  remove() {}

  playerCollision() {}

  update() {}
}

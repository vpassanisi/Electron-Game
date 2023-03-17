import type Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite } from "Pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";

export default class Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: PolygonHitbox | null;
  room: Room;
  sensor: PolygonHitbox | null;

  constructor(Game: Game, room: Room, tileCoords: Vector, roomCoords: Vector) {
    this.position = tileCoords;
    this.room = room;
    this.sprite = new Game.Pixi.Sprite();
    this.hitbox = new PolygonHitbox({
      Game,
      parent: Game.Stage,
      hitboxDimentions: {
        center: new Vector(),
        height: 50,
        width: 50,
      },
    });
    this.sensor = null;
  }

  remove() {}

  playerCollision() {}

  playerSensorCollision() {}

  update() {}
}

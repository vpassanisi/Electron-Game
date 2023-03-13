import type Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { Texture, Sprite } from "Pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "../Room";

export default class Rock implements Model {
  position: Vector;
  texture: Texture;
  sprite: Sprite;
  hitbox: PolygonHitbox;
  room: Room;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.room = room;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x,
      Game.dimentions.tileHeight * tileCoords.y,
    ]);

    this.texture = Game.Assets.rockTexture;

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.rock;

    this.hitbox = new PolygonHitbox({
      Game,
      parent: room.container,
      args: {
        verts: [
          new Vector([this.sprite.x, this.sprite.y]),
          new Vector([this.sprite.x + this.sprite.width, this.sprite.y]),
          new Vector([this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height]),
          new Vector([this.sprite.x, this.sprite.y + this.sprite.height]),
        ],
      },
    });

    this.room.container.addChild(this.sprite);
  }

  remove() {}

  playerCollision() {}

  update() {}
}

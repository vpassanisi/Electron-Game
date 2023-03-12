import type Game from "renderer/index";
import type { Texture, Sprite } from "Pixi.js";
import Model from "renderer/lib/world/Model";
import Vector from "renderer/vector";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";

export default class Wall implements Model {
  Game: Game;
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: PolygonHitbox;
  room: Room;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.Game = Game;
    this.room = room;

    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x,
      Game.dimentions.tileHeight * tileCoords.y,
    ]);

    const { x, y } = tileCoords;
    switch (true) {
      case x < 7 && y != 0 && y != 8:
        this.texture = Game.Assets.leftWallTexture;
        break;
      case x > 7 && y != 0 && y != 8:
        this.texture = Game.Assets.rightWallTexture;
        break;
      case y < 4 && x != 0 && x != 14:
        this.texture = Game.Assets.topWallTexture;
        break;
      case y > 4 && x != 0 && x != 14:
        this.texture = Game.Assets.bottomWallTexture;
        break;
      case x === 0 && y === 0:
        this.texture = Game.Assets.topLeftWallTexture;
        break;
      case x === 14 && y === 0:
        this.texture = Game.Assets.topRightWallTexture;
        break;
      case x === 0 && y === 8:
        this.texture = Game.Assets.bottomLeftWallTexture;
        break;
      case x === 14 && y === 8:
        this.texture = Game.Assets.bottomRightWallTexture;
        break;
      default:
        this.texture = Game.Assets.leftWallTexture;
    }
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.wall;

    this.hitbox = new PolygonHitbox({
      Game,
      parent: room.container,
      args: {
        verts: [
          new Vector([this.sprite.x, this.sprite.y]),
          new Vector([this.sprite.x + this.sprite.width, this.sprite.y]),
          new Vector([
            this.sprite.x + this.sprite.width,
            this.sprite.y + this.sprite.height,
          ]),
          new Vector([this.sprite.x, this.sprite.y + this.sprite.height]),
        ],
      },
    });

    room.container.addChild(this.sprite);
  }

  remove() {
    this.room.container.removeChild(this.sprite);
    this.room.container.removeChild(this.hitbox.graphics);
  }

  playerCollision() {}

  update() {}
}

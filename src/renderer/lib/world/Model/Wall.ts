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
  sensor: PolygonHitbox | null;
  room: Room;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.Game = Game;
    this.room = room;

    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x + Game.dimentions.tileWidth / 2,
      Game.dimentions.tileHeight * tileCoords.y + Game.dimentions.tileHeight / 2,
    ]);

    const { x, y } = tileCoords;
    switch (true) {
      case x < 7 && y != 0 && y != 8:
        this.texture = Game.Assets.textures.leftWallTexture;
        break;
      case x > 7 && y != 0 && y != 8:
        this.texture = Game.Assets.textures.rightWallTexture;
        break;
      case y < 4 && x != 0 && x != 14:
        this.texture = Game.Assets.textures.topWallTexture;
        break;
      case y > 4 && x != 0 && x != 14:
        this.texture = Game.Assets.textures.bottomWallTexture;
        break;
      case x === 0 && y === 0:
        this.texture = Game.Assets.textures.topLeftWallTexture;
        break;
      case x === 14 && y === 0:
        this.texture = Game.Assets.textures.topRightWallTexture;
        break;
      case x === 0 && y === 8:
        this.texture = Game.Assets.textures.bottomLeftWallTexture;
        break;
      case x === 14 && y === 8:
        this.texture = Game.Assets.textures.bottomRightWallTexture;
        break;
      default:
        this.texture = Game.Assets.textures.leftWallTexture;
    }
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.wall;

    this.hitbox = new PolygonHitbox({
      Game,
      hitboxDimentions: {
        center: this.position,
        height: this.Game.dimentions.tileHeight,
        width: this.Game.dimentions.tileWidth,
      },
    });
    this.sensor = null;

    room.container.addChild(this.sprite);
  }

  remove() {
    this.room.container.removeChild(this.sprite);
  }

  playerCollision() {}

  playerSensorCollision() {}
  update() {}
}

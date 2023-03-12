import type Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite } from "Pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";
import Model from "renderer/lib/world/Model";

export default class Switch implements Model {
  Game: Game;
  position: Vector;
  sprite: Sprite;
  hitbox: PolygonHitbox | null;
  room: Room;
  texture: Texture | undefined;
  leftTexture: Texture;
  rightTexture: Texture;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.Game = Game;
    this.position = tileCoords;
    this.room = room;
    this.leftTexture = Game.Assets.switchLeftTexture;
    this.rightTexture = Game.Assets.switchRightTexture;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x,
      Game.dimentions.tileHeight * tileCoords.y,
    ]);

    this.sprite = new Game.Pixi.Sprite(this.leftTexture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;

    this.hitbox = new PolygonHitbox({
      Game: this.Game,
      parent: this.room.container,
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

  playerCollision() {
    if (this.Game.Controller.justPressed.e) {
      if (this.sprite.texture === this.leftTexture) {
        this.sprite.texture = this.rightTexture;
        this.room.portal?.closePortal();
        this.Game.floorMap.clearGridCache();
      } else {
        this.sprite.texture = this.leftTexture;
        this.room.portal?.openPortal();
      }
    }
  }

  update() {}
}

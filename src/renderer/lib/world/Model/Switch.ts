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
  sensor: PolygonHitbox | null;
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
      Game.dimentions.tileWidth * tileCoords.x + Game.dimentions.tileWidth / 2,
      Game.dimentions.tileHeight * tileCoords.y + Game.dimentions.tileHeight / 2,
    ]);

    this.sprite = new Game.Pixi.Sprite(this.leftTexture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.room.container.addChild(this.sprite);

    this.hitbox = new PolygonHitbox({
      Game: this.Game,
      parent: this.room.container,
      hitboxDimentions: {
        center: this.position,
        height: this.Game.dimentions.tileHeight,
        width: this.Game.dimentions.tileWidth,
      },
    });

    this.sensor = new PolygonHitbox({
      Game,
      parent: this.room.container,
      hitboxDimentions: {
        center: this.position,
        height: this.Game.dimentions.tileHeight * 2,
        width: this.Game.dimentions.tileWidth * 2,
      },
    });
  }

  remove() {}

  playerCollision() {}

  playerSensorCollision() {
    console.log("sensor");
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

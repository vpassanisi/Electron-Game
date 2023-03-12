import type Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite } from "Pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";
import Model from "renderer/lib/world/Model";

export default class Poral implements Model {
  Game: Game;
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: PolygonHitbox | null;
  room: Room;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.Game = Game;
    this.position = tileCoords;
    this.room = room;
    this.texture = Game.Assets.portalTexture;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x,
      Game.dimentions.tileHeight * tileCoords.y,
    ]);

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;

    this.hitbox = null;

    if (room.id === "53") this.openPortal();
  }

  openPortal() {
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

  closePortal() {
    this.hitbox = null;
    this.room.container.removeChild(this.sprite);
  }

  remove() {}

  playerCollision() {
    if (this.room.meta.name === "Hideout") {
      if (this.Game.floorMap.gridCache) this.Game.floorMap.loadGridCache();
      else this.Game.floorMap.loadNewFloor();
    } else {
      this.Game.floorMap.cacheGrid();
      this.Game.floorMap.loadHideout();
    }
  }

  update() {}
}

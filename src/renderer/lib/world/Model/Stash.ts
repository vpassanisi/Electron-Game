import type Game from "renderer/index";
import Vector from "renderer/vector";
import type Model from "renderer/lib/world/Model";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";
import { Sprite, Texture } from "Pixi.js";

export default class Stash implements Model {
  Game: Game;
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: PolygonHitbox | null;
  room: Room;
  sensor: PolygonHitbox | null;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.Game = Game;
    this.room = room;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x + Game.dimentions.tileWidth / 2,
      Game.dimentions.tileHeight * tileCoords.y + Game.dimentions.tileHeight / 2,
    ]);

    this.texture = Game.Assets.textures.stashTexture;

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.rock;

    this.hitbox = new PolygonHitbox({
      Game,
      hitboxDimentions: {
        center: this.position,
        height: Game.dimentions.tileHeight - 12,
        width: Game.dimentions.tileWidth - 12,
      },
    });
    this.sensor = new PolygonHitbox({
      Game,
      hitboxDimentions: {
        center: this.position,
        height: this.Game.dimentions.tileHeight * 2,
        width: this.Game.dimentions.tileWidth * 2,
      },
    });

    this.sprite.on("click", (e) => e.stopPropagation());
    this.sprite.eventMode = "static";

    this.room.container.addChild(this.sprite);
  }

  remove() {}

  playerCollision() {}

  playerSensorCollision() {
    if (this.Game.Controller.justPressed.e) {
      this.Game.stashInventory.toggleInventory();
      this.Game.Player.inventory.toggleInventory();
      this.Game.Player.equipment.toggleEquipment();
    }
  }

  update() {}
}

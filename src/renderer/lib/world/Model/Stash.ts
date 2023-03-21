import type Game from "renderer/index";
import Vector from "renderer/vector";
import type Model from "renderer/lib/world/Model";
import type { Texture, Sprite } from "Pixi.js";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";
import InteractionPrompt from "renderer/lib/world/UI/InteractionPrompt";

export default class Stash implements Model {
  Game: Game;
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: PolygonHitbox | null;
  room: Room;
  sensor: PolygonHitbox | null;
  interactionPrompt: InteractionPrompt;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.Game = Game;
    this.room = room;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x + Game.dimentions.tileWidth / 2,
      Game.dimentions.tileHeight * tileCoords.y + Game.dimentions.tileHeight / 2,
    ]);

    this.interactionPrompt = new InteractionPrompt({
      key: "E",
      position: this.position,
      side: "left",
      Game: this.Game,
    });
    this.Game.UI.element.appendChild(this.interactionPrompt);

    this.texture = Game.Assets.stashTexture;

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.rock;

    this.hitbox = new PolygonHitbox({
      Game,
      parent: room.container,
      hitboxDimentions: {
        center: this.position,
        height: Game.dimentions.tileHeight - 12,
        width: Game.dimentions.tileWidth - 12,
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

    this.room.container.addChild(this.sprite);
  }

  remove() {}

  playerCollision() {}

  playerSensorCollision() {
    this.interactionPrompt.show = true;
    if (this.Game.Controller.justPressed.e) {
      this.Game.UI.StashUI.toggleStashUI();
    }
  }

  update() {
    this.interactionPrompt.show = false;
  }
}

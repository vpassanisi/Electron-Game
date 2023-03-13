import type Game from "renderer/index";
import Vector from "renderer/vector";
import type { Texture, Sprite, Graphics } from "Pixi.js";
import Room from "renderer/lib/world/Room";
import Model from "renderer/lib/world/Model";
import { Bodies, Body, Composite } from "matter-js";

export default class Switch implements Model {
  Game: Game;
  position: Vector;
  sprite: Sprite;
  hitbox: Body;
  graphics: Graphics;
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

    this.hitbox = Bodies.rectangle(
      this.position.x,
      this.position.y,
      this.Game.dimentions.tileWidth,
      this.Game.dimentions.tileHeight,
      { isStatic: true }
    );
    Composite.add(this.Game.MatterEngine.world, this.hitbox);

    this.graphics = new Game.Pixi.Graphics();
    this.graphics.zIndex = this.Game.zIndex.player + 1;
    this.Game.World.addChild(this.graphics);

    this.Game.Events.addListener("renderHitboxes", () => this.renderHitbox());
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

  renderHitbox() {
    this.graphics.clear();
    if (this.Game.state.debug) {
      const path: number[] = [];
      this.hitbox.vertices.forEach((vert) => {
        path.push(vert.x);
        path.push(vert.y);
      });

      this.graphics.clear();
      this.graphics.beginFill(0xff00b8);
      this.graphics.drawPolygon(path);
      this.graphics.endFill();

      this.graphics.beginFill(0xffffff);
      this.graphics.drawCircle(this.hitbox.position.x, this.hitbox.position.y, 3);
      this.graphics.endFill();
    }
  }

  update() {}
}

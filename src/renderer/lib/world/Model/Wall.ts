import type Game from "renderer/index";
import type { Texture, Sprite, Graphics } from "Pixi.js";
import Model from "renderer/lib/world/Model";
import Vector from "renderer/vector";
import Room from "renderer/lib/world/Room";
import { Bodies, Body, Composite } from "matter-js";

export default class Wall implements Model {
  Game: Game;
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  hitbox: Body;
  graphics: Graphics;
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
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.wall;

    this.hitbox = Bodies.rectangle(
      this.position.x,
      this.position.y,
      this.Game.dimentions.tileWidth,
      this.Game.dimentions.tileHeight,
      { isStatic: true }
    );
    Composite.add(this.Game.MatterEngine.world, this.hitbox);

    room.container.addChild(this.sprite);

    this.graphics = new Game.Pixi.Graphics();
    this.graphics.zIndex = this.Game.zIndex.player + 1;
    this.Game.World.addChild(this.graphics);

    this.Game.Events.addListener("renderHitboxes", () => this.renderHitbox());
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

  remove() {
    this.room.container.removeChild(this.sprite);
  }

  playerCollision() {}

  update() {}
}

import type Game from "renderer/index";
import type { Texture, Sprite } from "Pixi.js";
import Model from "renderer/lib/world/Model/Model";
import Vector from "renderer/vector";

export default class Wall implements Model {
  Game: Game;
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.Game = Game;

    this.position = new Vector([
      Game.canvas.offsetWidth * roomCoords.x +
        (Game.canvas.offsetWidth / 15) * tileCoords.x,
      Game.canvas.offsetHeight * roomCoords.y +
        (Game.canvas.offsetHeight / 9) * tileCoords.y,
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
    this.sprite.width = Game.canvas.offsetWidth / 15;
    this.sprite.height = Game.canvas.offsetHeight / 9;
    this.sprite.zIndex = Game.zIndex.wall;
    Game.Stage.addChild(this.sprite);
  }

  get leftSide() {
    return this.sprite.x;
  }
  get rightSide() {
    return this.sprite.x + this.sprite.width;
  }
  get topSide() {
    return this.sprite.y;
  }
  get bottomSide() {
    return this.sprite.y + this.sprite.height;
  }

  remove() {
    this.Game.Stage.removeChild(this.sprite);
  }

  playerCollision() {}

  update() {}
}

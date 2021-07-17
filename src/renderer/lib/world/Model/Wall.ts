import type Game from "src/renderer";
import type { Texture, Sprite } from "Pixi.js";
import Model from "./Model";
import Vector from "../../../Vector";
import { WallTypes } from "src/renderer/types";

export default class Wall implements Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  constructor(Game: Game, type: WallTypes, coords: Vector) {
    this.position = new Vector();
    this.position.x = (Game.canvas.offsetWidth / 15) * coords.x;
    this.position.y = (Game.canvas.offsetHeight / 9) * coords.y;

    switch (true) {
      case type === "left":
        this.texture = Game.Assets.leftWallTexture;
        break;
      case type === "right":
        this.texture = Game.Assets.rightWallTexture;
        break;
      case type === "top":
        this.texture = Game.Assets.topWallTexture;
        break;
      case type === "bottom":
        this.texture = Game.Assets.bottomWallTexture;
        break;
      case type === "topLeft":
        this.texture = Game.Assets.topLeftWallTexture;
        break;
      case type === "topRight":
        this.texture = Game.Assets.topRightWallTexture;
        break;
      case type === "bottomLeft":
        this.texture = Game.Assets.bottomLeftWallTexture;
        break;
      case type === "bottomRight":
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

  update() {}
}

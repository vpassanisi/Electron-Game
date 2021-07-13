import type Game from "src/renderer";
import type { Texture, Sprite } from "Pixi.js";
import Model from "./Model";
import Vector from "../../../vector";

export default class Wall implements Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  constructor(Game: Game, type: string, coords: Vector) {
    this.position = new Vector();
    this.position.x = (Game.root.offsetWidth / 15) * coords.x;
    this.position.y = (Game.root.offsetHeight / 9) * coords.y;

    let spriteX = 0;
    let spriteY = 0;

    switch (true) {
      case type === "left":
        spriteX = 16 * 3;
        spriteY = 16 * 1;
        break;
      case type === "right":
        spriteX = 16 * 5;
        spriteY = 16 * 1;
        break;
      case type === "top":
        spriteX = 16 * 4;
        spriteY = 16 * 0;
        break;
      case type === "bottom":
        spriteX = 16 * 4;
        spriteY = 16 * 2;
        break;
      case type === "topLeft":
        spriteX = 16 * 3;
        spriteY = 16 * 0;
        break;
      case type === "topRight":
        spriteX = 16 * 5;
        spriteY = 16 * 0;
        break;
      case type === "bottomLeft":
        spriteX = 16 * 3;
        spriteY = 16 * 2;
        break;
      case type === "bottomRight":
        spriteX = 16 * 5;
        spriteY = 16 * 2;
        break;
      default:
        break;
    }

    this.texture = new Game.Pixi.Texture(
      Game.envBaseTexture,
      new Game.Pixi.Rectangle(spriteX, spriteY, 16, 16)
    );
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.root.offsetWidth / 15;
    this.sprite.height = Game.root.offsetHeight / 9;
    Game.pixiApp.stage.addChild(this.sprite);
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
  render() {}
  playerCollision() {}
}

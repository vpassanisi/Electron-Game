import type { Texture, Sprite } from "Pixi.js";
import Game from "src/renderer";
import Vector from "../../../vector";
import Model from "./Model";

export default class Door implements Model {
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
        spriteX = 16 * 13;
        spriteY = 16 * 1;
        break;
      case type === "right":
        spriteX = 16 * 12;
        spriteY = 16 * 0;
        break;
      case type === "top":
        spriteX = 16 * 12;
        spriteY = 16 * 1;
        break;
      case type === "bottom":
        spriteX = 16 * 13;
        spriteY = 16 * 0;
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

    const hitBox = new Game.Pixi.Graphics();
    hitBox.beginFill(0xff00b8);
    hitBox.drawRect(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
    Game.pixiApp.stage.addChild(hitBox);
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

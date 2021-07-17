import type { Texture, Sprite } from "Pixi.js";
import Game from "src/renderer";
import Vector from "../../../Vector";
import Model from "./Model";

export default class Door implements Model {
  position: Vector;
  texture: Texture | undefined;
  sprite: Sprite;
  constructor(Game: Game, type: string, coords: Vector) {
    this.position = new Vector([
      (Game.canvas.offsetWidth / 15) * coords.x,
      (Game.canvas.offsetHeight / 9) * coords.y,
    ]);

    switch (true) {
      case type === "left":
        this.texture = Game.Assets.leftDoorTexture;
        break;
      case type === "right":
        this.texture = Game.Assets.rightDoorTexture;
        break;
      case type === "top":
        this.texture = Game.Assets.topDoorTexture;
        break;
      case type === "bottom":
        this.texture = Game.Assets.bottomDoorTexture;
        break;
    }

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.canvas.offsetWidth / 15;
    this.sprite.height = Game.canvas.offsetHeight / 9;
    Game.Stage.addChild(this.sprite);

    // const hitBox = new Game.Pixi.Graphics();
    // hitBox.beginFill(0xff00b8);
    // hitBox.drawRect(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
    // Game.pixiApp.stage.addChild(hitBox);
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

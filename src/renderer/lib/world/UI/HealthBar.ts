import Game from "renderer";
import { ProgressBar } from "@pixi/ui";
import { Graphics } from "Pixi.js";

export default class HealthBar {
  Game: Game;
  bar: ProgressBar;

  constructor(Game: Game) {
    this.Game = Game;
    const margin = 10;
    const height = this.Game.dimentions.tileWidth * 2;
    const width = this.Game.dimentions.tileWidth * 2;
    const border = 4;
    const borderColor = 0x141414;

    this.bar = new ProgressBar({
      bg: new Graphics()
        .beginFill(borderColor)
        .drawRoundedRect(0, 0, width, height, 100)
        .beginFill(0x000000)
        .drawRoundedRect(border, border, width - border * 2, height - border * 2, 100),
      fill: new Graphics()
        .beginFill(borderColor)
        .drawRoundedRect(0, 0, width, height, 100)
        .beginFill(0xb50c00)
        .drawRoundedRect(border, border, width - border * 2, height - border * 2, 100),
      progress: 100,
    });

    this.bar.angle = 270;
    this.bar.pivot.set(this.bar.width, 0);
    this.bar.x = this.Game.dimentions.tileWidth;
    this.bar.y = this.Game.dimentions.canvasHeight - this.bar.height - margin;

    this.Game.World.addChild(this.bar);
  }

  update() {}
}

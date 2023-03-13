import type { Container, Graphics } from "Pixi.js";
import type Game from "renderer";

export default class MiniMap {
  Game: Game;
  container: Container;
  graphics: Graphics;

  constructor(Game: Game) {
    this.Game = Game;
    this.container = new Game.Pixi.Container();
    this.graphics = new Game.Pixi.Graphics();

    this.container.addChild(this.graphics);
  }

  update() {
    this.graphics.clear();
    this.Game.floorMap.grid.forEach((row) => row.forEach((cell) => cell.drawMiniMap()));
  }
}

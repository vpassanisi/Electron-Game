import type { Container } from "pixi.js";
import type Game from "renderer";
import MiniMap from "renderer/lib/world/UI/MiniMap";

export default class UI {
  Game: Game;
  container: Container;
  MiniMap: MiniMap;
  constructor(Game: Game) {
    this.Game = Game;
    this.container = new Game.Pixi.Container();
    this.MiniMap = new MiniMap(Game);

    this.container.addChild(this.MiniMap.container);

    this.Game.World.addChild(this.container);
  }

  update() {
    this.MiniMap.update();
  }
}

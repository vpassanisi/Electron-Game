import type { Container } from "pixi.js";
import type Game from "renderer";
import MiniMap from "renderer/lib/world/UI/MiniMap";
import HealthBar from "./HealthBar";

export default class UI {
  Game: Game;
  container: Container;
  MiniMap: MiniMap;
  HealthBar: HealthBar;
  element: HTMLElement;
  constructor(Game: Game) {
    this.Game = Game;
    this.container = new Game.Pixi.Container();

    this.MiniMap = new MiniMap(Game);
    this.container.addChild(this.MiniMap.container);
    this.Game.World.addChild(this.container);

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    document.body.appendChild(this.element);

    this.HealthBar = new HealthBar(this.Game);
    this.element.appendChild(this.HealthBar);
  }

  update() {
    this.MiniMap.update();
    this.HealthBar.update();
  }
}

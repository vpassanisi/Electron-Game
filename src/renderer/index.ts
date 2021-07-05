import * as PIXI from "pixi.js";
import Controller from "./lib/Controller";
import Player from "./lib/Player";
import type { GameState } from "./types";

export default class Game {
  pixiApp: PIXI.Application;
  root: HTMLElement;
  Controller: Controller;
  state: GameState;
  Player: Player;

  constructor() {
    this.root = document.getElementById("app")!;
    this.root.style.width = "100%";
    this.root.style.height = "60vw";

    this.pixiApp = new PIXI.Application({
      width: this.root.offsetWidth,
      height: this.root.offsetHeight,
    });
    this.pixiApp.resizeTo = this.root;
    this.root.appendChild(this.pixiApp.view);

    // sharp textures
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    window.addEventListener("resize", () => {
      this.pixiApp.resize();
    });

    this.state = {
      paused: false,
      debug: false,
    };

    this.Controller = new Controller();
    this.Player = new Player(this, PIXI);

    this.pixiApp.ticker.add((delta) => {
      this.Controller.update();
      this.Controller.buttonPressed(this);

      this.Player.update(this);
    });
  }
}

declare global {
  interface Window {
    GameInstance: Game;
  }
}

window.GameInstance = new Game();

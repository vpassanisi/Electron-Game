import type { GameState, Tile } from "./types";
import * as Pixi from "pixi.js";
import Controller from "./lib/Controller";
import Player from "./lib/Player";
import { Room } from "./lib/world/roomMap";

export default class Game {
  pixiApp: Pixi.Application;
  root: HTMLElement;
  Controller: Controller;
  state: GameState;
  Player: Player;
  Pixi: typeof Pixi;
  Room: Tile[][];
  envBaseTexture: Pixi.BaseTexture;
  playerBaseTexture: Pixi.BaseTexture;

  constructor() {
    this.root = document.getElementById("app")!;
    this.root.style.width = "100%";
    this.root.style.height = "60vw";

    this.pixiApp = new Pixi.Application({
      width: this.root.offsetWidth,
      height: this.root.offsetHeight,
    });
    this.pixiApp.resizeTo = this.root;
    this.root.appendChild(this.pixiApp.view);

    window.addEventListener("resize", () => {
      this.pixiApp.resize();
    });

    this.state = {
      paused: false,
      debug: false,
    };

    this.Pixi = Pixi;
    this.envBaseTexture = this.Pixi.BaseTexture.from("/environment/Final_Tileset.png");
    this.playerBaseTexture = this.Pixi.BaseTexture.from("/player/knight_idle_spritesheet.png");

    this.Room = Room.map((row, i) =>
      row.map((tileTemp, j) => {
        const tile: Tile = {};
        if (tileTemp.model) {
          tile.model = new tileTemp.model.class(this, tileTemp.model.type, [j, i]);
        }
        return tile;
      })
    );

    this.Controller = new Controller();
    this.Player = new Player(this);

    this.pixiApp.ticker.add((delta) => {
      this.Controller.update();
      this.Controller.buttonPressed(this);

      this.Player.update(this);
      this.Player.render();
    });
  }
}

declare global {
  interface Window {
    GameInstance: Game;
  }
}

// sharp textures
Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST;

window.GameInstance = new Game();

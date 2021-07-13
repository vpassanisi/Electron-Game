import type { GameState, Tile } from "./types";
import * as Pixi from "pixi.js";
import Controller from "./lib/Controller";
import Player from "./lib/Player";
import { Room } from "./lib/world/roomMap";
import Vector from "./vector";
import Wall from "./lib/world/Model/Wall";
import Door from "./lib/world/Model/Door";

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
        if (tileTemp.model && tileTemp.modelType) {
          switch (true) {
            case tileTemp.model === "Wall":
              tile.model = new Wall(this, tileTemp.modelType, new Vector([j, i]));
              break;
            case tileTemp.model === "Door":
              tile.model = new Door(this, tileTemp.modelType, new Vector([j, i]));
              break;
          }
        }
        return tile;
      })
    );

    this.Controller = new Controller();
    this.Player = new Player(this);

    this.pixiApp.ticker.add((delta) => {
      this.Controller.update();
      this.Controller.buttonPressed(this);

      if (!this.state.paused) {
        this.Player.update(this);
        this.checkPlayerCollisions();
        this.Player.render();
      }

      if (this.state.debug) {
        this.Player.drawHitBox();
      }
    });
  }

  checkPlayerCollisions() {
    const checkFirst = [
      this.Room[this.Player.currentTileCoords.y - 1][this.Player.currentTileCoords.x],
      this.Room[this.Player.currentTileCoords.y][this.Player.currentTileCoords.x - 1],
      this.Room[this.Player.currentTileCoords.y][this.Player.currentTileCoords.x + 1],
      this.Room[this.Player.currentTileCoords.y + 1][this.Player.currentTileCoords.x],
    ];
    const checkSecond = [
      this.Room[this.Player.currentTileCoords.y - 1][this.Player.currentTileCoords.x - 1],
      this.Room[this.Player.currentTileCoords.y - 1][this.Player.currentTileCoords.x + 1],
      this.Room[this.Player.currentTileCoords.y][this.Player.currentTileCoords.x],
      this.Room[this.Player.currentTileCoords.y + 1][this.Player.currentTileCoords.x - 1],
      this.Room[this.Player.currentTileCoords.y + 1][this.Player.currentTileCoords.x + 1],
    ];

    const player = this.Player;

    checkFirst.forEach((tile) => {
      const model = tile?.model;
      if (!model) return;
      if (
        player.leftSide < model.rightSide &&
        player.rightSide > model.leftSide &&
        player.topSide < model.bottomSide &&
        player.bottomSide > model.topSide
      ) {
        player.modelCollision(model);
      }
    });

    if (!this.Player.shouldCheckCollision) return;

    checkSecond.forEach((tile) => {
      const model = tile?.model;
      if (!model) return;
      if (
        player.leftSide < model.rightSide &&
        player.rightSide > model.leftSide &&
        player.topSide < model.bottomSide &&
        player.bottomSide > model.topSide
      ) {
        player.modelCollision(model);
      }
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

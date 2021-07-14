import type { GameState, Tile } from "./types";
import * as Pixi from "pixi.js";
import Controller from "./lib/Controller";
import Player from "./lib/Player";
import { Room } from "./lib/world/roomMap";
import Vector from "./vector";
import Wall from "./lib/world/Model/Wall";
import Door from "./lib/world/Model/Door";
import Assets from "./util/Assets";

export default class Game {
  canvas: HTMLCanvasElement;
  Controller: Controller;
  state: GameState;
  Player: Player;
  Pixi: typeof Pixi;
  Room: Tile[][];
  Assets: Assets;
  Renderer: Pixi.Renderer;
  Stage: Pixi.Container;
  Ticker: Pixi.Ticker;

  constructor() {
    this.canvas = document.getElementById("app") as HTMLCanvasElement;

    this.Renderer = new Pixi.Renderer({
      view: this.canvas,
      width: window.innerWidth,
      height: window.innerWidth * 0.6,
    });

    window.addEventListener("resize", () => {
      this.Renderer.resize(window.innerWidth, window.innerWidth * 0.6);
    });

    this.Stage = new Pixi.Container();
    this.Ticker = new Pixi.Ticker();

    this.state = {
      paused: false,
      debug: false,
    };

    this.Pixi = Pixi;
    this.Assets = new Assets(this);

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

    const animate = () => {
      this.Controller.update();
      this.Controller.buttonPressed(this);

      if (!this.state.paused) {
        this.Player.update(this);
        this.checkPlayerCollisions();
        this.Player.move();
      }

      this.Renderer.render(this.Stage);
    };

    this.Ticker.add(animate);
    this.Ticker.start();
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

import type { GameState, Tile } from "./types";
import * as Pixi from "pixi.js";
import Controller from "./lib/Controller";
import Player from "./lib/Player";
import Room from "./lib/world/roomMap";
import Assets from "./util/Assets";
import type Entity from "./lib/world/Entity/Entity";
import Vector from "./Vector";

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
  NonPlayerEntities: Entity[];

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

    this.NonPlayerEntities = [];
    this.Room = Room(this).map((row) => {
      return row.map((t) => {
        const tile = {
          backgorund: t.background && t.background(),
          model: t.model && t.model(),
          entity: t.entity && t.entity(),
        };
        tile.entity && this.NonPlayerEntities.push(tile.entity);
        return tile;
      });
    });

    this.Controller = new Controller();
    this.Player = new Player(this);

    const animate = () => {
      this.Controller.update();
      this.Controller.buttonPressed(this);

      if (!this.state.paused) {
        this.Player.update(this);
        this.checkPlayerCollisions();
        this.checkNonPlayerCollisions();
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

  checkNonPlayerCollisions() {
    // this is dumb just check every entity
    const playerCoords = this.Player.currentTileCoords;
    const check = [
      new Vector([playerCoords.x - 1, playerCoords.y - 1]),
      new Vector([playerCoords.x, playerCoords.y - 1]),
      new Vector([playerCoords.x + 1, playerCoords.y - 1]),
      new Vector([playerCoords.x - 1, playerCoords.y]),
      new Vector([playerCoords.x, playerCoords.y]),
      new Vector([playerCoords.x + 1, playerCoords.y]),
      new Vector([playerCoords.x - 1, playerCoords.y + 1]),
      new Vector([playerCoords.x, playerCoords.y + 1]),
      new Vector([playerCoords.x + 1, playerCoords.y + 1]),
    ];

    check.forEach((tileCoords) => {
      this.NonPlayerEntities.forEach((entity) => {
        if (
          tileCoords.x === entity.currentTileCoords.x &&
          tileCoords.y === entity.currentTileCoords.y
        ) {
          if (
            this.Player.leftSide < entity.rightSide &&
            this.Player.rightSide > entity.leftSide &&
            this.Player.topSide < entity.bottomSide &&
            this.Player.bottomSide > entity.topSide
          ) {
            this.Player.entityCollision(entity);
          }
        }
      });
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

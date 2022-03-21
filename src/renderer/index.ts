import type { GameState, Tile } from "./types";
import * as Pixi from "pixi.js";
import Controller from "./lib/Controller";
import Player from "./lib/Player";
import Room from "./lib/world/roomMap";
import Assets from "./util/Assets";
import type Entity from "./lib/world/Entity/Entity";

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
  lastX: number;
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

    this.Room = Room(this).map((row) => {
      return row.map((t) => {
        return {
          background: t.background && t.background(),
          model: t.model && t.model(),
        };
      });
    });

    this.NonPlayerEntities = [];
    Room(this).forEach((row) => {
      row.forEach((t) => t.entity && this.NonPlayerEntities.push(t.entity()));
    });

    this.Controller = new Controller();
    this.Player = new Player(this);

    this.lastX = 0;
    const animate = () => {
      this.Controller.update();
      this.Controller.buttonPressed(this);

      if (!this.state.paused) {
        this.Player.update(this);
        this.NonPlayerEntities.forEach((npe) => npe.update(this));

        this.playerNPECollisions();

        this.npeModelCollisions();
        this.playerModelColisions();

        this.Player.move();
        this.NonPlayerEntities.forEach((npe) => npe.move());
      }

      this.Renderer.render(this.Stage);
    };

    this.Ticker.add(animate);
    this.Ticker.start();
  }

  playerModelColisions() {
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

  npeModelCollisions() {
    this.NonPlayerEntities.forEach((npe) => {
      const checkFirst = [
        this.Room[npe.currentTileCoords.y - 1][npe.currentTileCoords.x],
        this.Room[npe.currentTileCoords.y][npe.currentTileCoords.x - 1],
        this.Room[npe.currentTileCoords.y][npe.currentTileCoords.x + 1],
        this.Room[npe.currentTileCoords.y + 1][npe.currentTileCoords.x],
      ];
      const checkSecond = [
        this.Room[npe.currentTileCoords.y - 1][npe.currentTileCoords.x - 1],
        this.Room[npe.currentTileCoords.y - 1][npe.currentTileCoords.x + 1],
        this.Room[npe.currentTileCoords.y][npe.currentTileCoords.x],
        this.Room[npe.currentTileCoords.y + 1][npe.currentTileCoords.x - 1],
        this.Room[npe.currentTileCoords.y + 1][npe.currentTileCoords.x + 1],
      ];

      checkFirst.forEach((tile) => {
        const model = tile?.model;
        if (!model) return;
        if (
          npe.leftSide < model.rightSide &&
          npe.rightSide > model.leftSide &&
          npe.topSide < model.bottomSide &&
          npe.bottomSide > model.topSide
        ) {
          npe.modelCollision(model);
        }
      });

      checkSecond.forEach((tile) => {
        const model = tile?.model;
        if (!model) return;
        if (
          npe.leftSide < model.rightSide &&
          npe.rightSide > model.leftSide &&
          npe.topSide < model.bottomSide &&
          npe.bottomSide > model.topSide
        ) {
          npe.modelCollision(model);
        }
      });
    });
  }

  playerNPECollisions() {
    this.NonPlayerEntities.forEach((entity) => {
      if (
        this.Player.leftSide < entity.rightSide &&
        this.Player.rightSide > entity.leftSide &&
        this.Player.topSide < entity.bottomSide &&
        this.Player.bottomSide > entity.topSide
      ) {
        entity.playerCollision(this.Player);
        this.Player.entityCollision(entity);
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

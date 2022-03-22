import anime from 'animejs';
import type { GameState, Tile } from "renderer/types";
import * as Pixi from "pixi.js";
import Controller from "renderer/lib/Controller";
import Player from "renderer/lib/Player";
import Room from "renderer/lib/world/roomMap";
import Assets from "renderer/util/Assets";
import type Entity from "renderer/lib/world/Entity/Entity";
import Vector from "renderer/vector";

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
  roomTransition: {
    current: number,
    max: number,
    delta: number,
  }
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

    this.roomTransition = {
      current: 0,
      max: 500,
      delta: 1
    }

    this.NonPlayerEntities = [];
    this.Room = Room(this, new Vector([0,0])).map((row) => {
      return row.map((t) => {
        return {
          background: t.background && t.background(),
          model: t.model && t.model()
        };
      });
    });

    Room(this, new Vector([0,0])).forEach((row) => {
      row.forEach((t) => t.entity && this.NonPlayerEntities.push(t.entity()));
    });

    this.Controller = new Controller();
    this.Player = new Player(this);

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

  moveStageRight() {
    anime({
      targets: [this.Stage.pivot],
      x: this.Stage.pivot.x + 100,
      round: 1,
      duration: 500,
      easing: "easeInQuad",
    })
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

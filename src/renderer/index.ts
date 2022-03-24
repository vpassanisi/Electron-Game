import anime from 'animejs';
import type { GameState } from "renderer/types";
import * as Pixi from "pixi.js";
import Controller from "renderer/lib/Controller";
import Player from "renderer/lib/Player";
import Room from "renderer/lib/world/roomMap";
import Assets from "renderer/util/Assets";
import type Entity from "renderer/lib/world/Entity/Entity";
import Vector from "renderer/vector";
import Cell from "renderer/lib/world/Cell";
import makeFloorGrid from './util/floorGrid';

export default class Game {
  private _currentRoom: Room;
  canvas: HTMLCanvasElement;
  Controller: Controller;
  state: GameState;
  Player: Player;
  Pixi: typeof Pixi;
  Rooms: Room[];
  Assets: Assets;
  Renderer: Pixi.Renderer;
  Stage: Pixi.Container;
  Ticker: Pixi.Ticker;
  NonPlayerEntities: Entity[];
  zIndex: {
    background: number,
    wall: number,
    rock: number,
    bat: number,
    player: number
  }
  startingRoom: Vector;
  floorGrid: Cell[][];
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
      debug: false
    };

    this.Pixi = Pixi;
    this.Assets = new Assets(this);

    this.Stage.sortableChildren = true;
    this.NonPlayerEntities = [];
    this.zIndex = {
      background: 0,
      wall: 10,
      rock: 20,
      bat: 20,
      player: 1000
    }
    this.floorGrid = makeFloorGrid(this);
    this.floorGrid.forEach((row) => row.forEach((cell) => cell.setNeighbours()));

    // make this use the floorGrid
    this.Rooms = [new Room(this, new Vector([4,5]))];
    this.NonPlayerEntities = this.Rooms[0].entities;
    this._currentRoom = this.Rooms[0];
    this.startingRoom = this.Rooms[0].coords;

    this.Stage.pivot.x = this.canvas.offsetWidth * this.startingRoom.x;
    this.Stage.pivot.y = this.canvas.offsetHeight * this.startingRoom.y;

    this.Controller = new Controller(this);
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

  get currentRoom() {
    return this._currentRoom;
  }

  set currentRoom(room: Room) {
    this._currentRoom = room;
    this.NonPlayerEntities = room.entities;
  }

  generateFloor() {
    this.Rooms.forEach((room) => {
      const up = room.coords.y - 1
      const down = room.coords.y + 1
      const left = room.coords.x - 1
      const right = room.coords.x + 1

      const neighbourCells = [
        new Vector([room.coords.x, up]),
        new Vector([room.coords.x, down]),
        new Vector([left, room.coords.y]),
        new Vector([right, room.coords.y])
      ]

      neighbourCells.forEach((cell) => {
        if (cell.x < 0 || cell.x > 7) return;
        if (cell.y < 0 || cell.y > 9) return;

        // need to make a grid of cell classes so they can have getter of their neighbours
      })
    })
  }

  moveStageRight() {
    anime({
      targets: [this.Stage.pivot],
      x: this.Stage.pivot.x + this.canvas.offsetWidth,
      round: 1,
      duration: 500,
      easing: "easeInQuad"
    })
  }

  moveStageLeft() {
    anime({
      targets: [this.Stage.pivot],
      x: this.Stage.pivot.x - this.canvas.offsetWidth,
      round: 1,
      duration: 500,
      easing: "easeInQuad"
    })
  }

  moveStageDown() {
    anime({
      targets: [this.Stage.pivot],
      y: this.Stage.pivot.y + this.canvas.offsetHeight,
      round: 1,
      duration: 500,
      easing: "easeInQuad"
    })
  }

  moveStageUp() {
    anime({
      targets: [this.Stage.pivot],
      y: this.Stage.pivot.y - this.canvas.offsetHeight,
      round: 1,
      duration: 500,
      easing: "easeInQuad"
    })
  }

  playerModelColisions() {
    const checkFirst = [
      this.currentRoom.map[this.Player.currentTileCoords.y - 1][this.Player.currentTileCoords.x],
      this.currentRoom.map[this.Player.currentTileCoords.y][this.Player.currentTileCoords.x - 1],
      this.currentRoom.map[this.Player.currentTileCoords.y][this.Player.currentTileCoords.x + 1],
      this.currentRoom.map[this.Player.currentTileCoords.y + 1][this.Player.currentTileCoords.x],
    ];
    const checkSecond = [
      this.currentRoom.map[this.Player.currentTileCoords.y - 1][this.Player.currentTileCoords.x - 1],
      this.currentRoom.map[this.Player.currentTileCoords.y - 1][this.Player.currentTileCoords.x + 1],
      this.currentRoom.map[this.Player.currentTileCoords.y][this.Player.currentTileCoords.x],
      this.currentRoom.map[this.Player.currentTileCoords.y + 1][this.Player.currentTileCoords.x - 1],
      this.currentRoom.map[this.Player.currentTileCoords.y + 1][this.Player.currentTileCoords.x + 1],
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
        this.currentRoom.map[npe.currentTileCoords.y - 1][npe.currentTileCoords.x],
        this.currentRoom.map[npe.currentTileCoords.y][npe.currentTileCoords.x - 1],
        this.currentRoom.map[npe.currentTileCoords.y][npe.currentTileCoords.x + 1],
        this.currentRoom.map[npe.currentTileCoords.y + 1][npe.currentTileCoords.x],
      ];
      const checkSecond = [
        this.currentRoom.map[npe.currentTileCoords.y - 1][npe.currentTileCoords.x - 1],
        this.currentRoom.map[npe.currentTileCoords.y - 1][npe.currentTileCoords.x + 1],
        this.currentRoom.map[npe.currentTileCoords.y][npe.currentTileCoords.x],
        this.currentRoom.map[npe.currentTileCoords.y + 1][npe.currentTileCoords.x - 1],
        this.currentRoom.map[npe.currentTileCoords.y + 1][npe.currentTileCoords.x + 1],
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

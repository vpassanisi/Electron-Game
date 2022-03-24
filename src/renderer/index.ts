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
    background: number
    wall: number
    rock: number
    bat: number
    player: number
  }
  startingRoom: Vector;
  floorGrid: Cell[][];
  maxRooms: number;
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
    this.maxRooms = 6;
    this.startingRoom = new Vector([5,3])
    this.floorGrid = makeFloorGrid(this);
    this.floorGrid.forEach((row) => row.forEach((cell) => cell.setNeightbours()))

    this._currentRoom = this.floorGrid[this.startingRoom.y][this.startingRoom.x].loadRoom();
    this.Rooms = [this._currentRoom];
    this.NonPlayerEntities = this.currentRoom.entities;

    this.generateFloor();

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
    while (this.Rooms.length < this.maxRooms) {
      for (const room of this.Rooms) {
        for (const cell of room.cell.neighbours) {
          if (this.Rooms.length >= this.maxRooms) break;
          if (!cell) continue;
          if (cell.room) continue;
          const listOfFilledNeighbours = [];
          for (const neigbour of cell.neighbours) {
            if (neigbour && neigbour.room) listOfFilledNeighbours.push(neigbour);
          }
          if (listOfFilledNeighbours.length > 1) continue;
          if (Math.random() >= 0.5) continue;
          this.Rooms.push(cell.loadRoom());
        }
        if (this.Rooms.length >= this.maxRooms) break;
      }
    }
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

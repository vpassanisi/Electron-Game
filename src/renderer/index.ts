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
import makeFloorGrid from 'renderer/util/floorGrid';
import { shuffleArray } from 'renderer/util/generalUtil';

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
  World: Pixi.Container;
  Stage: Pixi.Container;
  MiniMap: Pixi.Container;
  MiniMapGraphics: Pixi.Graphics;
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

    this.World = new Pixi.Container();
    this.Stage = new Pixi.Container();
    this.MiniMap = new Pixi.Container();
    this.MiniMapGraphics = new Pixi.Graphics();
    this.MiniMap.addChild(this.MiniMapGraphics);

    this.Ticker = new Pixi.Ticker();

    this.World.addChild(this.Stage);
    this.World.addChild(this.MiniMap);


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
    this.maxRooms = 8;
    this.startingRoom = new Vector([5,3])
    this.floorGrid = makeFloorGrid(this);
    this.floorGrid.forEach((row) => row.forEach((cell) => cell.setNeightbours()))

    this._currentRoom = this.floorGrid[this.startingRoom.y][this.startingRoom.x].loadRoom();
    this.Rooms = [this._currentRoom];
    this.NonPlayerEntities = this.currentRoom.entities;

    this.generateFloor();

    this.floorGrid.forEach((row) => row.forEach((cell) => cell.drawMiniMap()))

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

      this.Renderer.render(this.World);
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
        const shuffledNeighbours = shuffleArray(room.cell.neighbours)
        for (const cell of shuffledNeighbours) {
          if (this.Rooms.length >= this.maxRooms) break;
          if (!cell) continue;
          if (cell.room) continue;
          if (cell.numberOfFilledNeighbours > 1) continue;
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

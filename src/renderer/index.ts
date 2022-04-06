import type { GameState } from "renderer/types";
import * as Pixi from "pixi.js";
import Controller from "renderer/lib/Controller";
import Player from "renderer/lib/Player";
import Room from "renderer/lib/world/Room";
import Assets from "renderer/util/Assets";
import type Entity from "renderer/lib/world/Entity/Entity";
import Vector from "renderer/vector";
import Cell from "renderer/lib/world/Cell";
import makeFloorGrid from "renderer/util/floorGrid";
import { shuffleArray } from "renderer/util/generalUtil";
import Events from "renderer/util/Events";

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
  PlayerEntities: Entity[];
  zIndex: {
    background: number;
    wall: number;
    rock: number;
    bat: number;
    player: number;
  };
  startingRoom: Vector;
  floorGrid: Cell[][];
  maxRooms: number;
  Events: Events;
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

    this.Events = new Events();
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
      debug: false,
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
      player: 1000,
    };
    this.maxRooms = 10;
    this.startingRoom = new Vector([5, 3]);
    this.floorGrid = makeFloorGrid(this);
    this.Events.setNeightbours();

    this._currentRoom =
      this.floorGrid[this.startingRoom.y][this.startingRoom.x].loadRoom();
    this.Rooms = [this._currentRoom];
    this.NonPlayerEntities = this.currentRoom.entities;
    this.PlayerEntities = [];

    this.generateFloor();
    this.Events.setDoors();

    this.Stage.pivot.x = this.canvas.offsetWidth * this.startingRoom.x;
    this.Stage.pivot.y = this.canvas.offsetHeight * this.startingRoom.y;

    this.Controller = new Controller(this);
    this.Player = new Player(this);

    const animate = () => {
      this.Controller.update();
      this.Controller.buttonPressed();

      if (!this.state.paused) {
        this.Player.update(this);
        this.NonPlayerEntities.forEach((npe) => npe.update(this));
        this.PlayerEntities.forEach((pe) => pe.update(this));

        this.playerNPECollisions();
        this.peModelCollisions();
        this.npeModelCollisions();
        this.peNPECollisions();
        this.playerModelColisions();

        this.Player.move();
        this.NonPlayerEntities.forEach((npe) => npe.move());
        this.PlayerEntities.forEach((pe) => pe.move());
      }

      this.MiniMapGraphics.clear();
      this.Events.renderMiniMap();

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
        const shuffledNeighbours = shuffleArray(room.cell.neighbours);
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

  clearPlayerEntities() {
    this.PlayerEntities.forEach((pe) => pe.remove());
  }

  playerModelColisions() {
    // if the player is moving fast, x or y plus or minus 1 could be outside the room map
    const { x, y } = this.Player.currentTileCoords;
    const checkFirst = [
      this.currentRoom.map[y - 1]?.[x],
      this.currentRoom.map[y]?.[x - 1],
      this.currentRoom.map[y]?.[x + 1],
      this.currentRoom.map[y + 1]?.[x],
    ];
    const checkSecond = [
      this.currentRoom.map[y - 1]?.[x - 1],
      this.currentRoom.map[y - 1]?.[x + 1],
      this.currentRoom.map[y]?.[x],
      this.currentRoom.map[y + 1]?.[x - 1],
      this.currentRoom.map[y + 1]?.[x + 1],
    ];

    const player = this.Player;

    checkFirst.forEach((tile, i) => {
      const model = tile?.model;
      if (!model) return;
      if (
        player.leftSide < model.rightSide &&
        player.rightSide > model.leftSide &&
        player.topSide < model.bottomSide &&
        player.bottomSide > model.topSide
      ) {
        player.modelCollision(model);
        model.playerCollision();
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
      const { x, y } = npe.currentTileCoords;
      const checkFirst = [
        this.currentRoom.map[y - 1][x],
        this.currentRoom.map[y][x - 1],
        this.currentRoom.map[y][x + 1],
        this.currentRoom.map[y + 1][x],
      ];
      const checkSecond = [
        this.currentRoom.map[y - 1][x - 1],
        this.currentRoom.map[y - 1][x + 1],
        this.currentRoom.map[y][x],
        this.currentRoom.map[y + 1][x - 1],
        this.currentRoom.map[y + 1][x + 1],
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

  peModelCollisions() {
    this.PlayerEntities.forEach((pe) => {
      const { x, y } = pe.currentTileCoords;
      const checkFirst = [
        this.currentRoom.map[y - 1][x],
        this.currentRoom.map[y][x - 1],
        this.currentRoom.map[y][x + 1],
        this.currentRoom.map[y + 1][x],
      ];
      const checkSecond = [
        this.currentRoom.map[y - 1][x - 1],
        this.currentRoom.map[y - 1][x + 1],
        this.currentRoom.map[y][x],
        this.currentRoom.map[y + 1][x - 1],
        this.currentRoom.map[y + 1][x + 1],
      ];

      checkFirst.forEach((tile) => {
        const model = tile?.model;
        if (!model) return;
        if (
          pe.leftSide < model.rightSide &&
          pe.rightSide > model.leftSide &&
          pe.topSide < model.bottomSide &&
          pe.bottomSide > model.topSide
        ) {
          pe.modelCollision(model);
        }
      });

      checkSecond.forEach((tile) => {
        const model = tile?.model;
        if (!model) return;
        if (
          pe.leftSide < model.rightSide &&
          pe.rightSide > model.leftSide &&
          pe.topSide < model.bottomSide &&
          pe.bottomSide > model.topSide
        ) {
          pe.modelCollision(model);
        }
      });
    });
  }
  peNPECollisions() {
    this.PlayerEntities.forEach((pe) => {
      this.NonPlayerEntities.forEach((npe) => {
        if (
          pe.leftSide < npe.rightSide &&
          pe.rightSide > npe.leftSide &&
          pe.topSide < npe.bottomSide &&
          pe.bottomSide > npe.topSide
        ) {
          pe.entityCollision(npe);
          npe.entityCollision(pe);
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

import type { GameState } from "renderer/types";
import * as Pixi from "pixi.js";
import Controller from "renderer/lib/Controller";
import Player from "renderer/lib/Player";
import Room from "renderer/lib/world/Room";
import Assets from "renderer/util/Assets";
import Vector from "renderer/vector";
import Cell from "renderer/lib/world/Cell";
import makeFloorGrid from "renderer/util/floorGrid";
import { shuffleArray } from "renderer/util/generalUtil";
import Events from "renderer/util/Events";
import NonPlayerEntities from "renderer/lib/NonPlayerEntities";
import PlayerProjectiles from "renderer/lib/PlayerProjectiles";
import CollisionEngine from "renderer/util/CollisionEngine";

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
  NonPlayerEntities: NonPlayerEntities;
  PlayerProjectiles: PlayerProjectiles;
  CollisionEngine: CollisionEngine;
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
    this.CollisionEngine = new CollisionEngine(this);

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
    this.NonPlayerEntities = new NonPlayerEntities(this);
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
    this.NonPlayerEntities.add(...this.currentRoom.entities);
    this.PlayerProjectiles = new PlayerProjectiles(this);

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
        // this.NonPlayerEntities.updateAll();
        this.PlayerProjectiles.updateAll();

        this.CollisionEngine.playerModelColisions();

        this.Player.move();
        // this.NonPlayerEntities.moveAll();
        this.PlayerProjectiles.moveAll();

        this.checkRoom();
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
    this.NonPlayerEntities.set(room.entities);
    this.PlayerProjectiles.deleteAll();
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

  checkRoom() {
    if (
      this.NonPlayerEntities.numberOfEntities === 0 &&
      !this.currentRoom.isClear
    ) {
      this.currentRoom.clear();
    }
  }

  playerModelColisions() {}
  npeModelCollisions() {}
  playerNPECollisions() {}
  projectileModelCollisions() {}
  projectileNPECollisions() {}
}

declare global {
  interface Window {
    GameInstance: Game;
  }
}

// sharp textures
Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST;

window.GameInstance = new Game();

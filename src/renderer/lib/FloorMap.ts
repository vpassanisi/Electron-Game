import Game from "renderer";
import Cell from "renderer/lib/world/Cell";
import makeFloorGrid from "renderer/util/floorGrid";
import { shuffleArray } from "renderer/util/generalUtil";
import Vector from "renderer/vector";
import Room from "renderer/lib/world/Room";
import PlayerProjectiles from "renderer/lib/PlayerProjectiles";
import { Body, Detector } from "matter-js";

export default class FloorMap {
  Game: Game;
  grid: Cell[][];
  startingRoom: Vector;
  rooms: Room[];
  maxRooms: number;
  gridCache: Cell[][] | null;
  private _currentRoom: Room | null;

  constructor(Game: Game) {
    this.Game = Game;
    this.rooms = [];
    this.gridCache = null;
    this.maxRooms = 10;
    this.startingRoom = new Vector([5, 3]);
    this.grid = [];

    this._currentRoom = null;
    this.rooms = [];
  }

  get currentRoom() {
    return this._currentRoom;
  }

  setCurrentRoom(room: Room) {
    this._currentRoom = room;
    if (!room.isClear) {
      this.Game.NonPlayerEntities.set(room.entities);
    }
    this.Game.PlayerProjectiles.deleteAll();
  }

  cacheGrid() {
    this.gridCache = this.grid;
    this.grid = makeFloorGrid(this.Game);
  }

  clearGridCache() {
    this.gridCache = null;
  }

  loadGridCache() {
    if (!this.gridCache) return;
    this.Game.NonPlayerEntities.delteAll();
    this.Game.PlayerProjectiles.deleteAll();
    this.Game.Stage.removeChildren();

    this.grid = this.gridCache;
    this.rooms = [];
    this.gridCache = null;

    const { x, y } = this.startingRoom;
    const startingCell = this.grid[y][x];
    if (startingCell.room) this._currentRoom = startingCell.room;
    else this._currentRoom = startingCell.loadStartingRoom();
    this.grid.forEach((row) =>
      row.forEach((cell) => {
        if (cell.room) {
          this.rooms.push(cell.room);
          this.Game.Stage.addChild(cell.room.container);
        }
      })
    );

    this.Game.PlayerProjectiles = new PlayerProjectiles(this.Game);

    this.Game.Stage.pivot.x = this.Game.dimentions.canvasWidth * x;
    this.Game.Stage.pivot.y = this.Game.dimentions.canvasHeight * y;

    this.Game.Player.setRoom(this._currentRoom.container);

    this.Game.Player.move();
  }

  loadHideout() {
    this.Game.NonPlayerEntities.delteAll();
    this.Game.PlayerProjectiles.deleteAll();
    this.Game.Stage.removeChildren();
    this.grid = makeFloorGrid(this.Game);

    const { x, y } = this.startingRoom;
    this._currentRoom = this.grid[y][x].loadHideout();
    this.rooms = [this._currentRoom];

    this.Game.Stage.pivot.x = this.Game.dimentions.canvasWidth * x;
    this.Game.Stage.pivot.y = this.Game.dimentions.canvasHeight * y;

    Detector.setBodies(this.Game.PlayerModelDetector, [
      ...this._currentRoom.models
        .map((model) => model.hitbox)
        .filter((hitbox): hitbox is Body => !!hitbox),
      this.Game.Player.hitBox,
    ]);

    this.Game.Player.setRoom(this._currentRoom.container);

    this.Game.Player.move();
  }

  generateFloor() {
    while (this.rooms.length < this.maxRooms) {
      for (const room of this.rooms) {
        const shuffledNeighbours = shuffleArray(room.cell.neighbours);
        for (const cell of shuffledNeighbours) {
          if (this.rooms.length >= this.maxRooms) break;
          if (!cell) continue;
          if (cell.room) continue;
          if (cell.numberOfFilledNeighbours > 1) continue;
          if (Math.random() >= 0.5) continue;
          this.rooms.push(cell.loadRoom());
        }
        if (this.rooms.length >= this.maxRooms) break;
      }
    }
  }

  loadNewFloor() {
    this.Game.NonPlayerEntities.delteAll();
    this.Game.PlayerProjectiles.deleteAll();
    this.Game.Stage.removeChildren();

    this.gridCache = null;
    this.grid = makeFloorGrid(this.Game);

    const { x, y } = this.startingRoom;
    this._currentRoom = this.grid[y][x].loadStartingRoom();
    this.rooms = [this._currentRoom];

    this.Game.PlayerProjectiles = new PlayerProjectiles(this.Game);

    this.generateFloor();
    this.Game.Events.dispatchEvent("setDoors");

    this.Game.Stage.pivot.x = this.Game.dimentions.canvasWidth * x;
    this.Game.Stage.pivot.y = this.Game.dimentions.canvasHeight * y;

    this.Game.Player.setRoom(this._currentRoom.container);

    this.Game.Player.move();
  }
}

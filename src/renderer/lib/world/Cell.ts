import * as Pixi from "pixi.js";
import Game from "renderer/index";
import Room from "renderer/lib/world/roomMap";
import Vector from "renderer/vector";

export default class Cell {
  Game: Game;
  room: Room | null;
  coordinates: Vector;
  neighbours: (Cell | null)[];

  constructor(Game: Game, coordinates: Vector) {
    this.Game = Game;
    this.room = null;
    this.coordinates = coordinates;
    this.neighbours = [];
  }
  
  get numberOfFilledNeighbours() {
    const listOfFilledNeighbours = [];
    for (const neigbour of this.neighbours) {
      if (neigbour && neigbour.room) listOfFilledNeighbours.push(neigbour);
    }
    return listOfFilledNeighbours.length;
  }

  setNeightbours() {
    this.neighbours = [
      this.Game.floorGrid?.[this.coordinates.y - 1]?.[this.coordinates.x] ?? null,
      this.Game.floorGrid?.[this.coordinates.y + 1]?.[this.coordinates.x] ?? null,
      this.Game.floorGrid?.[this.coordinates.y]?.[this.coordinates.x - 1] ?? null,
      this.Game.floorGrid?.[this.coordinates.y]?.[this.coordinates.x + 1] ?? null
    ]
  }

  loadRoom() {
    this.room = new Room(this.Game, this, this.coordinates);
    return this.room;
  }

  drawMiniMap() {
    const color = this.room ? 0xAA4F08 : 0x000000;
    this.Game.MiniMapGraphics.lineStyle(2, 0xFFFFFF, 1);
    this.Game.MiniMapGraphics.beginFill(color);
    this.Game.MiniMapGraphics.drawRect(
      (this.Game.canvas.offsetWidth / 30) * this.coordinates.x,
      (this.Game.canvas.offsetHeight / 30) * this.coordinates.y,
      this.Game.canvas.offsetWidth / 30,
      this.Game.canvas.offsetHeight / 30
    );
    this.Game.MiniMapGraphics.endFill();
  }
}
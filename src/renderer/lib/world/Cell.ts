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
}
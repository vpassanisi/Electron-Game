import Game from "renderer/index";
import Room from "renderer/lib/world/roomMap";
import Vector from "renderer/vector";

export default class Cell {
  Game: Game;
  room: Room | null;
  coordinates: Vector;
  up: Cell | null;
  down: Cell | null;
  left: Cell | null;
  right: Cell | null;

  constructor(Game: Game, coordinates: Vector) {
    this.Game = Game;
    this.room = null;
    this.coordinates = coordinates;

    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
  }

  setNeighbours() {
    this.up = this.Game.floorGrid?.[this.coordinates.y - 1]?.[this.coordinates.x] ?? null;
    this.down = this.Game.floorGrid?.[this.coordinates.y + 1]?.[this.coordinates.x] ?? null;
    this.left = this.Game.floorGrid?.[this.coordinates.y]?.[this.coordinates.x - 1] ?? null;
    this.right = this.Game.floorGrid?.[this.coordinates.y]?.[this.coordinates.x + 1] ?? null;
  }

  loadRoom() {
    this.room = new Room(this.Game, this.coordinates);
  }
}
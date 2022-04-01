import Game from "renderer/index";
import Room from "renderer/lib/world/Room";
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

    this.Game.Events.element.addEventListener("renderMiniMap", () =>
      this.drawMiniMap()
    );
    this.Game.Events.element.addEventListener("setNeightbours", () =>
      this.setNeightbours()
    );
  }

  get numberOfFilledNeighbours() {
    const listOfFilledNeighbours = [];
    for (const neigbour of this.neighbours) {
      if (neigbour && neigbour.room) listOfFilledNeighbours.push(neigbour);
    }
    return listOfFilledNeighbours.length;
  }

  setNeightbours() {
    const { x, y } = this.coordinates;
    this.neighbours = [
      this.Game.floorGrid?.[y - 1]?.[x] ?? null,
      this.Game.floorGrid?.[y + 1]?.[x] ?? null,
      this.Game.floorGrid?.[y]?.[x - 1] ?? null,
      this.Game.floorGrid?.[y]?.[x + 1] ?? null,
    ];
  }

  loadRoom() {
    this.room = new Room(this.Game, this, this.coordinates);
    return this.room;
  }

  drawMiniMap() {
    let color: number;
    switch (true) {
      case this.room && this.room.id === this.Game.currentRoom.id:
        color = 0xffca8a;
        break;
      case !!this.room:
        color = 0xaa4f08;
        break;
      default:
        color = 0x000000;
    }
    this.Game.MiniMapGraphics.lineStyle(2, 0xffffff, 1);
    this.Game.MiniMapGraphics.beginFill(color);
    this.Game.MiniMapGraphics.drawRect(
      (this.Game.canvas.offsetWidth / 50) * this.coordinates.x,
      (this.Game.canvas.offsetHeight / 50) * this.coordinates.y,
      this.Game.canvas.offsetWidth / 50,
      this.Game.canvas.offsetHeight / 50
    );
    this.Game.MiniMapGraphics.endFill();
  }
}

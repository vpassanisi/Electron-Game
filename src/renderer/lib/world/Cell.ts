import type Game from "renderer/index";
import Room from "renderer/lib/world/Room";
import Vector from "renderer/vector";
import { Hideout, StartingRoom } from "renderer/lib/world/Rooms";

export default class Cell {
  Game: Game;
  room: Room | null;
  coordinates: Vector;
  mounted: boolean;

  constructor(Game: Game, coordinates: Vector) {
    this.Game = Game;
    this.room = null;
    this.coordinates = coordinates;
    this.mounted = false;
  }

  // will be wrong when in gridCache
  get neighbours(): (Cell | null)[] {
    const { x, y } = this.coordinates;
    return [
      this.Game.FloorMap.grid[y - 1]?.[x] ?? null,
      this.Game.FloorMap.grid[y + 1]?.[x] ?? null,
      this.Game.FloorMap.grid[y]?.[x - 1] ?? null,
      this.Game.FloorMap.grid[y]?.[x + 1] ?? null,
    ];
  }

  get numberOfFilledNeighbours() {
    const listOfFilledNeighbours = [];
    for (const neigbour of this.neighbours) {
      if (neigbour && neigbour.room) listOfFilledNeighbours.push(neigbour);
    }
    return listOfFilledNeighbours.length;
  }

  loadRoom() {
    this.room = new Room({
      Game: this.Game,
      cell: this,
      roomCoords: this.coordinates,
    });
    return this.room;
  }

  loadStartingRoom() {
    this.room = new Room({
      Game: this.Game,
      cell: this,
      roomCoords: this.coordinates,
      map: StartingRoom,
    });
    return this.room;
  }

  loadHideout() {
    this.room = new Room({
      Game: this.Game,
      cell: this,
      roomCoords: this.coordinates,
      map: Hideout,
    });
    return this.room;
  }

  drawMiniMap() {
    let color: number;
    switch (true) {
      case this.room && this.room.id === this.Game.FloorMap.currentRoom?.id:
        color = 0xffca8a;
        break;
      case !!this.room && this.room?.isClear:
        color = 0xe09d00;
        break;
      case !!this.room:
        color = 0xaa4f08;
        break;
      default:
        color = 0x000000;
    }

    // this.Game.UI.MiniMap.graphics.lineStyle(2, 0xffffff, 1);
    // this.Game.UI.MiniMap.graphics.beginFill(color);
    // this.Game.UI.MiniMap.graphics.drawRect(
    //   (this.Game.dimentions.canvasWidth / 50) * this.coordinates.x,
    //   (this.Game.dimentions.canvasHeight / 50) * this.coordinates.y,
    //   this.Game.dimentions.canvasWidth / 50,
    //   this.Game.dimentions.canvasHeight / 50
    // );
    // this.Game.UI.MiniMap.graphics.endFill();
  }
}

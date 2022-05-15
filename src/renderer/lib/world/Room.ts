import type Game from "renderer/index";
import Vector from "renderer/vector";
import Background from "renderer/lib/world/Background";
import Entity from "renderer/lib/world/Entity";
import Cell from "renderer/lib/world/Cell";
import { models, backgrounds, entities } from "renderer/lib/world/roomMap1";
import Tile from "renderer/lib/world/Tile";
import Door from "renderer/lib/world/Model/Door";
import Model from "renderer/lib/world/Model";

export default class Room {
  Game: Game;
  map: Tile[][];
  entities: Entity[];
  models: Model[];
  coords: Vector;
  cell: Cell;
  isClear: boolean;
  id: string;
  doors: Door[];
  constructor(Game: Game, cell: Cell, roomCoords: Vector) {
    this.Game = Game;
    this.entities = [];
    this.models = [];
    this.coords = roomCoords;
    this.cell = cell;
    this.isClear = false;
    this.id = `${this.coords.x}${this.coords.y}`;
    this.doors = [];

    this.Game.Events.element.addEventListener("setDoors", () =>
      this.setDoors()
    );

    this.map = [];
    for (const [y, row] of models.entries()) {
      this.map[y] = [];
      for (const [x, model] of row.entries()) {
        const tileCoords = new Vector([x, y]);
        this.map[y][x] = new Tile(Game, tileCoords, roomCoords);
        if (model) {
          const m = new model(Game, tileCoords, roomCoords);
          this.map[y][x].model = m;
          this.models.push(m);
        }
      }
    }
    for (const [y, row] of backgrounds.entries()) {
      for (const [x, background] of row.entries()) {
        const tileCoords = new Vector([x, y]);
        if (background) {
          this.map[y][x].background = new Background(
            Game,
            background,
            tileCoords,
            roomCoords
          );
        }
      }
    }
    for (const [y, row] of entities.entries()) {
      for (const [x, entity] of row.entries()) {
        const tileCoords = new Vector([x, y]);
        if (entity) {
          const e = new entity(Game, tileCoords, roomCoords);
          this.map[y][x].entity = e;
          this.entities.push(e);
        }
      }
    }
  }

  setDoors() {
    const { x, y } = this.coords;
    const up: Cell | undefined = this.Game.floorGrid[y - 1]?.[x];
    const down: Cell | undefined = this.Game.floorGrid[y + 1]?.[x];
    const left: Cell | undefined = this.Game.floorGrid[y]?.[x - 1];
    const right: Cell | undefined = this.Game.floorGrid[y]?.[x + 1];

    if (up && up.room) {
      const tile = this.map[0][7];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, new Vector([7, 0]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
    if (down && down.room) {
      const tile = this.map[8][7];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, new Vector([7, 8]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
    if (left && left.room) {
      const tile = this.map[4][0];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, new Vector([0, 4]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
    if (right && right.room) {
      const tile = this.map[4][14];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, new Vector([14, 4]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
  }

  clear() {
    this.isClear = true;
    this.doors.forEach((door) => door.open());
  }
}

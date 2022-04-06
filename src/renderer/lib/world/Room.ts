import type Game from "renderer/index";
import Vector from "renderer/vector";
import Background from "renderer/lib/world/Background/Background";
import Entity from "renderer/lib/world/Entity/Entity";
import Cell from "renderer/lib/world/Cell";
import { models, backgrounds, entities } from "renderer/lib/world/roomMap1";
import Tile from "renderer/lib/world/Tile";
import Door from "renderer/lib/world/Model/Door";

export default class Room {
  Game: Game;
  map: Tile[][];
  entities: Entity[];
  coords: Vector;
  cell: Cell;
  id: string;
  constructor(Game: Game, cell: Cell, roomCoords: Vector) {
    this.Game = Game;
    this.entities = [];
    this.coords = roomCoords;
    this.cell = cell;
    this.id = `${this.coords.x}${this.coords.y}`;

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
          this.map[y][x].model = new model(Game, tileCoords, roomCoords);
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
      tile.model = new Door(this.Game, new Vector([7, 0]), this.coords);
    }
    if (down && down.room) {
      const tile = this.map[8][7];
      if (tile.model) tile.model.remove();
      tile.model = new Door(this.Game, new Vector([7, 8]), this.coords);
    }
    if (left && left.room) {
      const tile = this.map[4][0];
      if (tile.model) tile.model.remove();
      tile.model = new Door(this.Game, new Vector([0, 4]), this.coords);
    }
    if (right && right.room) {
      const tile = this.map[4][14];
      if (tile.model) tile.model.remove();
      tile.model = new Door(this.Game, new Vector([14, 4]), this.coords);
    }
  }
}

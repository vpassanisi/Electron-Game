import type Game from "renderer/index";
import Vector from "renderer/vector";
import Background from "renderer/lib/world/Background";
import Entity from "renderer/lib/world/Entity";
import Cell from "renderer/lib/world/Cell";
import Tile from "renderer/lib/world/Tile";
import Door from "renderer/lib/world/Model/Door";
import Model from "renderer/lib/world/Model";
import type { Container, Graphics } from "Pixi.js";
import { getRandomRoom } from "renderer/lib/world/Rooms";
import { RoomMap, RoomMapMeta } from "renderer/types";
import FloorItems from "renderer/lib/FloorItems";
import Portal from "renderer/lib/world/Model/Portal";

interface RoomArgs {
  Game: Game;
  cell: Cell;
  roomCoords: Vector;
  map?: RoomMap;
}

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
  container: Container;
  meta: RoomMapMeta;
  floorItems: FloorItems;
  portal: Portal | null;
  debugGraphics: Graphics;

  constructor({ Game, cell, roomCoords, map }: RoomArgs) {
    this.Game = Game;
    this.entities = [];
    this.models = [];
    this.coords = roomCoords;
    this.cell = cell;
    this.isClear = false;
    this.id = `${this.coords.x}${this.coords.y}`;
    this.doors = [];
    this.portal = null;
    this.floorItems = new FloorItems(Game);
    this.container = new Game.Pixi.Container();
    this.container.x = Game.dimentions.canvasWidth * roomCoords.x;
    this.container.y = Game.dimentions.canvasHeight * roomCoords.y;
    this.container.sortableChildren = true;
    this.Game.Stage.addChild(this.container);

    this.debugGraphics = new Game.Pixi.Graphics();
    this.debugGraphics.zIndex = 99999;
    this.container.addChild(this.debugGraphics);

    this.Game.Events.addListener("setDoors", () => this.setDoors());

    const { backgrounds, models, entities, meta } = map ? map : getRandomRoom();
    this.meta = meta;
    this.map = [];
    for (const [y, row] of backgrounds.entries()) {
      this.map[y] = [];
      for (const [x, background] of row.entries()) {
        const tileCoords = new Vector([x, y]);
        this.map[y][x] = new Tile(Game, this, tileCoords, roomCoords);
        if (background) {
          this.map[y][x].background = new Background(Game, this, background, tileCoords);
        }
      }
    }
    for (const [y, row] of models.entries()) {
      for (const [x, model] of row.entries()) {
        const tileCoords = new Vector([x, y]);
        if (model) {
          const m = new model(Game, this, tileCoords, roomCoords);
          if (m instanceof Portal) this.portal = m;
          this.map[y][x].model = m;
          this.models.push(m);
        }
      }
    }
    for (const [y, row] of entities.entries()) {
      for (const [x, entity] of row.entries()) {
        const tileCoords = new Vector([x, y]);
        if (entity) {
          const e = new entity(Game, this, tileCoords, roomCoords);
          this.map[y][x].entity = e;
          this.entities.push(e);
        }
      }
    }
  }

  setDoors() {
    const { x, y } = this.coords;
    const up: Cell | undefined = this.Game.FloorMap.grid[y - 1]?.[x];
    const down: Cell | undefined = this.Game.FloorMap.grid[y + 1]?.[x];
    const left: Cell | undefined = this.Game.FloorMap.grid[y]?.[x - 1];
    const right: Cell | undefined = this.Game.FloorMap.grid[y]?.[x + 1];

    if (up && up.room) {
      const tile = this.map[0][7];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, this, new Vector([7, 0]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
    if (down && down.room) {
      const tile = this.map[8][7];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, this, new Vector([7, 8]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
    if (left && left.room) {
      const tile = this.map[4][0];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, this, new Vector([0, 4]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
    if (right && right.room) {
      const tile = this.map[4][14];
      if (tile.model) tile.model.remove();
      const door = new Door(this.Game, this, new Vector([14, 4]), this.coords);
      tile.model = door;
      this.doors.push(door);
    }
  }

  renderHitboxes() {
    this.models.forEach((model) => model.hitbox?.render());
    this.entities.forEach((e) => {
      // e.pathFinder.lineOfSightHitbox.render();
      e.pathFinder.pathDebug.forEach((p) => p.render());
    });
  }

  clear() {
    this.isClear = true;
    this.doors.forEach((door) => door.open());
  }
}

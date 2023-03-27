import Game from "renderer";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import CircleHitbox from "renderer/lib/CircleHitbox";
import Entity from "renderer/lib/world/Entity";
import Wall from "renderer/lib/world/Model/Wall";
import Tile from "renderer/lib/world/Tile";
import Vector from "renderer/vector";
import { distanceBetween } from "renderer/util/generalUtil";

interface pathTile {
  tile: Tile;
  gScore: number;
  fScore: number;
  evaluated: boolean;
}

interface args {
  Game: Game;
  mob: Entity;
}

export default class PathFinder {
  Game: Game;
  mob: Entity;
  lineOfSightHitbox: PolygonHitbox;
  lineOfSightWidth: number;
  pathDebug: CircleHitbox[];
  constructor({ Game, mob }: args) {
    this.Game = Game;
    this.mob = mob;
    this.lineOfSightWidth = 20;
    this.pathDebug = [];

    const center = new Vector([
      (this.Game.Player.hitBox.center.x + this.mob.hitBox.center.x) / 2,
      (this.Game.Player.hitBox.center.y + this.mob.hitBox.center.y) / 2,
    ]);

    this.lineOfSightHitbox = new PolygonHitbox({
      Game: this.Game,
      hitboxVerts: {
        center,
        verts: [
          this.rotate90clockwise(center, this.mob.hitBox.center),
          this.rotate90counterClockwise(center, this.mob.hitBox.center),
          this.rotate90clockwise(center, this.Game.Player.hitBox.center),
          this.rotate90counterClockwise(center, this.Game.Player.hitBox.center),
        ],
      },
    });
  }

  update() {
    const center = new Vector([
      (this.Game.Player.hitBox.center.x + this.mob.hitBox.center.x) / 2,
      (this.Game.Player.hitBox.center.y + this.mob.hitBox.center.y) / 2,
    ]);

    this.lineOfSightHitbox = new PolygonHitbox({
      Game: this.Game,
      hitboxVerts: {
        center,
        verts: [
          this.rotate90clockwise(center, this.mob.hitBox.center),
          this.rotate90counterClockwise(center, this.mob.hitBox.center),
          this.rotate90clockwise(center, this.Game.Player.hitBox.center),
          this.rotate90counterClockwise(center, this.Game.Player.hitBox.center),
        ],
      },
    });
  }

  rotate90clockwise(p: Vector, origin: Vector) {
    const prime = new Vector([p.x - origin.x, p.y - origin.y]).scaleTo(this.lineOfSightWidth);
    const doublePrime = new Vector([-prime.y, prime.x]);
    return new Vector([doublePrime.x + origin.x, doublePrime.y + origin.y]);
  }

  rotate90counterClockwise(p: Vector, origin: Vector) {
    const prime = new Vector([p.x - origin.x, p.y - origin.y]).scaleTo(this.lineOfSightWidth);
    const doublePrime = new Vector([prime.y, -prime.x]);
    return new Vector([doublePrime.x + origin.x, doublePrime.y + origin.y]);
  }

  hasLineOfSight() {
    return !this.Game.FloorMap.currentRoom?.models.find((model) => {
      if (model instanceof Wall || !model.hitbox) return false;
      const A = model.hitbox;
      const B = this.lineOfSightHitbox;

      const testAB = this.Game.CollisionEngine.polygonPolygonSAT(A, B);
      if (!testAB.collision) return false;

      const testBA = this.Game.CollisionEngine.polygonPolygonSAT(B, A);
      if (!testBA.collision) return false;
      return model;
    });
  }

  pathFind() {
    if (!this.Game.FloorMap.currentRoom) return null;
    // coppy the grid first?
    const floorMap: (pathTile | null)[][] = [];
    this.Game.FloorMap.currentRoom.map.forEach((row, y) => {
      if (!floorMap[y]) floorMap[y] = [];
      row.forEach((tile, x) => {
        if (!tile.model) {
          floorMap[y][x] = {
            fScore: 0,
            gScore: 0,
            tile,
            evaluated: false,
          };
        } else {
          floorMap[y][x] = null;
        }
      });
    });

    const { x, y } = this.mob.currentTileCoords;
    const start = floorMap[y][x];
    if (start) {
      start.evaluated = true;
      start.fScore = Infinity;
      start.gScore = 0;
    } else throw new Error("start was blocked");

    const playerCoords = this.Game.Player.currentTileCoords;
    const playerTile = floorMap[playerCoords.y][playerCoords.x];
    if (!playerTile) throw new Error("player tile was blocked");

    const open = [start];

    while (open.length > 0) {
      const next = open.reduce((a, b) => (a.fScore < b.fScore ? a : b));
      const id = open.findIndex((openTile) => openTile.tile.id === next.tile.id);
      open.splice(id, 1);

      if (next.tile.id === playerTile.tile.id) {
        this.pathDebug = [];
        let g = next.gScore - 10;
        let backtrackTile = next;
        const path = [];
        while (g >= 10) {
          let adjacent = this.getOpenTiles(backtrackTile.tile.tileCoords, floorMap);
          adjacent = adjacent.filter((a) => a.gScore === g);
          const chosen = adjacent.reduce((a, b) => (a.fScore < b.fScore ? a : b));
          backtrackTile = chosen;
          path.unshift(chosen);
          g -= 10;
        }
        path.forEach((p) => {
          this.pathDebug.push(
            new CircleHitbox({ Game: this.Game, center: p.tile.center, radius: 10 })
          );
        });
        return path;
      }

      const nextNeighbours = this.getOpenTiles(next.tile.tileCoords, floorMap);
      nextNeighbours.forEach((nextNeighbour) => {
        if (!nextNeighbour.evaluated) {
          const gScore = next.gScore + 10;
          const selfInOpen = open.find((e, i) => e.tile.id === nextNeighbour.tile.id);

          if (!selfInOpen) {
            nextNeighbour.evaluated = true;
            nextNeighbour.gScore = gScore;
            nextNeighbour.fScore =
              gScore + distanceBetween(playerTile.tile.center, nextNeighbour.tile.center);
            open.push(nextNeighbour);
          } else if (selfInOpen && gScore < selfInOpen.gScore) {
            console.log("it broke bc not finished?");
          }
        }
      });
    }
  }

  getOpenTiles(pos: Vector, map: (pathTile | null)[][]) {
    const { x, y } = pos;
    const tiles = [
      map[y - 1]?.[x],
      map[y]?.[x - 1],
      map[y]?.[x + 1],
      map[y + 1]?.[x],
      map[y - 1]?.[x - 1],
      map[y - 1]?.[x + 1],
      map[y + 1]?.[x - 1],
      map[y + 1]?.[x + 1],
    ];
    return tiles.filter((tile): tile is pathTile => tile !== null);
  }
}

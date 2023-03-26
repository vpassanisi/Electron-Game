import Game from "renderer";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Entity from "renderer/lib/world/Entity";
import Wall from "renderer/lib/world/Model/Wall";
import Tile from "renderer/lib/world/Tile";
import Vector from "renderer/vector";
import { distanceBetween } from "renderer/util/generalUtil";

interface evaluatedTile {
  tile: Tile;
  gScore: number;
  fScore: number;
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
  constructor({ Game, mob }: args) {
    this.Game = Game;
    this.mob = mob;
    this.lineOfSightWidth = 20;

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
    const floorMap = this.Game.FloorMap.currentRoom.map;
    const { x, y } = this.mob.currentTileCoords;
    const open: evaluatedTile[] = [
      {
        tile: this.Game.FloorMap.currentRoom.map[y][x],
        gScore: 0,
        fScore: Infinity,
      },
    ];

    const playerCoords = this.Game.Player.currentTileCoords;
    const playerTile = floorMap[playerCoords.y][playerCoords.x];

    while (open.length > 0) {
      const next = open.reduce((a, b) => (a.fScore < b.fScore ? a : b));
      const id = open.findIndex((openTile) => openTile.tile.id === next.tile.id);
      open.splice(id, 1);

      if (next.tile.id === playerTile.id) {
        return;
      }

      const nextNeighbours = this.getOpenTiles(next.tile.tileCoords, floorMap);
      nextNeighbours.forEach((nextNeighbour) => {
        if (!open.find((e) => e.tile.id === nextNeighbour.id)) {
          const gScore = next.gScore + 1;
          const tileScore = {
            tile: nextNeighbour,
            gScore,
            fScore: gScore + distanceBetween(nextNeighbour.center, this.Game.Player.hitBox.center),
          };
          open.push(tileScore);
        }
      });
    }
  }

  getOpenTiles(pos: Vector, map: Tile[][]) {
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
    return tiles.filter((tile) => !tile.model);
  }
}

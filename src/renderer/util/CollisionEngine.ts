import Game from "renderer";
import Hitbox from "renderer/lib/Hitbox";
import { satResult } from "renderer/types";
import Vector from "renderer/vector";

export default class CollisionEngine {
  Game: Game;
  constructor(Game: Game) {
    this.Game = Game;
  }

  checkAll() {}

  playerModelColisions() {
    const { x, y } = this.Game.Player.currentTileCoords;
    const checkFirst = [
      this.Game.currentRoom.map[y - 1]?.[x],
      this.Game.currentRoom.map[y]?.[x - 1],
      this.Game.currentRoom.map[y]?.[x + 1],
      this.Game.currentRoom.map[y + 1]?.[x],
    ];
    const checkSecond = [
      this.Game.currentRoom.map[y - 1]?.[x - 1],
      this.Game.currentRoom.map[y - 1]?.[x + 1],
      this.Game.currentRoom.map[y]?.[x],
      this.Game.currentRoom.map[y + 1]?.[x - 1],
      this.Game.currentRoom.map[y + 1]?.[x + 1],
    ];

    let firstResult: satResult | undefined;
    let secondResult: satResult | undefined;

    checkFirst.forEach((tile) => {
      if (!tile.model) return;
      const A = this.Game.Player.hitBox;
      const B = tile.model.hitbox;

      const testAB = this.sat(A, B);
      if (!testAB.collision) return;

      const testBA = this.sat(B, A);
      if (!testBA.collision) return;
      testBA.axis.multiply(-1);

      firstResult = testAB.distance < testBA.distance ? testAB : testBA;
    });
    if (firstResult) {
      this.Game.Player.hitBox.move(
        firstResult.axis.clone().multiply(firstResult.distance)
      );
    }

    checkSecond.forEach((tile) => {
      if (!tile.model) return;
      const A = this.Game.Player.hitBox;
      const B = tile.model.hitbox;

      const testAB = this.sat(A, B);
      if (!testAB.collision) return;

      const testBA = this.sat(B, A);
      if (!testBA.collision) return;
      testBA.axis.multiply(-1);

      secondResult = testAB.distance < testBA.distance ? testAB : testBA;
    });
    if (secondResult) {
      this.Game.Player.hitBox.move(
        secondResult.axis.clone().multiply(secondResult.distance)
      );
    }
  }

  sat(hitbox1: Hitbox, hitbox2: Hitbox): satResult {
    let shortestDist = Number.MAX_VALUE;
    let shortestAxis = new Vector();
    const verts1 = hitbox1.getClonedPoints();
    const verts2 = hitbox2.getClonedPoints();

    for (let i = 0; i < verts1.length; i++) {
      const axis = this.getPerpendicularAxis(verts1, i);

      const hitbox1Range = this.projectVerts(axis, verts1);
      const hitbox2Range = this.projectVerts(axis, verts2);

      if (
        hitbox1Range.min - hitbox2Range.max > 0 ||
        hitbox2Range.min - hitbox1Range.max > 0
      ) {
        return { collision: false, axis: new Vector(), distance: Infinity };
      }

      let distMin = hitbox2Range.max - hitbox1Range.min;
      let distMinAbs = Math.abs(distMin);
      if (distMinAbs < shortestDist) {
        shortestDist = distMinAbs;
        shortestAxis = axis;
      }
    }

    return { collision: true, axis: shortestAxis, distance: shortestDist };
  }

  getPerpendicularAxis(verts: Vector[], i: number) {
    const p1 = verts[i];
    const p2 = i >= verts.length - 1 ? verts[0] : verts[i + 1];
    const axis = new Vector([-(p2.y - p1.y), p2.x - p1.x]);
    return axis.normalize();
  }

  projectVerts(axis: Vector, verts: Vector[]) {
    let min = this.dotProduct(axis, verts[0]);
    let max = min;

    for (let i = 1; i < verts.length; i++) {
      let temp = this.dotProduct(axis, verts[i]);
      if (temp < min) min = temp;
      if (temp > max) max = temp;
    }

    return { min, max };
  }

  dotProduct(v1: Vector, v2: Vector) {
    return v1.x * v2.x + v1.y * v2.y;
  }
}

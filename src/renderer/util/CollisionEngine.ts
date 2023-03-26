import type Game from "renderer";
import type PolygonHitbox from "renderer/lib/PolygonHitbox";
import type CircleHitbox from "renderer/lib/CircleHitbox";
import { satResult } from "renderer/types";
import Vector from "renderer/vector";
import { Item } from "renderer/lib/world/Item";

export default class CollisionEngine {
  Game: Game;
  constructor(Game: Game) {
    this.Game = Game;
  }

  checkAll() {}

  playerModelCollisions() {
    const { currentRoom } = this.Game.FloorMap;
    if (!currentRoom) return;
    const { x, y } = this.Game.Player.currentTileCoords;
    const tiles = [
      currentRoom.map[y - 1]?.[x],
      currentRoom.map[y]?.[x - 1],
      currentRoom.map[y]?.[x + 1],
      currentRoom.map[y + 1]?.[x],
      currentRoom.map[y - 1]?.[x - 1],
      currentRoom.map[y - 1]?.[x + 1],
      currentRoom.map[y]?.[x],
      currentRoom.map[y + 1]?.[x - 1],
      currentRoom.map[y + 1]?.[x + 1],
    ];

    tiles.forEach((tile) => {
      if (!tile || !tile.model || !tile.model.hitbox) return;
      let A, B;
      if (tile.model.sensor) {
        A = this.Game.Player.hitBox;
        B = tile.model.sensor;

        const testAB = this.polygonPolygonSAT(A, B);
        if (testAB.collision) {
          const testBA = this.polygonPolygonSAT(B, A);
          if (testBA.collision) {
            tile.model.playerSensorCollision();
          }
        }
      }

      A = this.Game.Player.hitBox;
      B = tile.model.hitbox;

      const testAB = this.polygonPolygonSAT(A, B);
      if (!testAB.collision) return;

      const testBA = this.polygonPolygonSAT(B, A);
      if (!testBA.collision) return;
      testBA.axis.multiply(-1);

      const result = testAB.distance < testBA.distance ? testAB : testBA;
      if (result.distance) {
        this.Game.Player.hitBox.move(result.axis.clone().multiply(result.distance));
      }
      if (result.collision) {
        tile.model.playerCollision();
      }
    });
  }

  playerEntityCollision() {
    const entities = this.Game.NonPlayerEntities.list;
    for (const key in entities) {
      const e = entities[key];
      const A = this.Game.Player.hitBox;
      const B = e.hitBox;

      const testAB = this.polygonPolygonSAT(A, B);
      if (!testAB.collision) return;

      const testBA = this.polygonPolygonSAT(B, A);
      if (!testBA.collision) return;
      testBA.axis.multiply(-1);

      const result = testAB.distance < testBA.distance ? testAB : testBA;
      if (result.distance) {
        this.Game.Player.hit(e.contactDamage);
        this.Game.Player.hitBox.move(result.axis.clone().multiply(result.distance / 2));
        e.hitBox.move(
          result.axis
            .clone()
            .multiply(-1)
            .multiply(result.distance / 2)
        );
      }
    }
  }

  // playerItemCollision() {
  //   let itemCollision: null | Item = null;

  //   const items = this.Game.FloorMap.currentRoom?.floorItems.list;
  //   if (!items) return;
  //   for (const key in items) {
  //     const item = items[key];
  //     const A = item.hitbox;
  //     const B = this.Game.Player.hitBox;

  //     const result = this.circlePolygonSAT(A, B);
  //     if (result.collision) itemCollision = item;
  //   }

  //   if (itemCollision && this.Game.Controller.keys.f) {
  //     this.Game.Player.inventory.putItemInInventory(itemCollision);
  //     itemCollision.pickup();
  //     this.Game.FloorMap.currentRoom?.floorItems.remove(itemCollision);
  //   }
  // }

  npeModelCollision() {
    const entities = this.Game.NonPlayerEntities.list;
    for (const key in entities) {
      const e = entities[key];
      const { currentRoom } = this.Game.FloorMap;
      if (!currentRoom) return;
      const { x, y } = e.currentTileCoords;
      const tiles = [
        currentRoom.map[y - 1]?.[x],
        currentRoom.map[y]?.[x - 1],
        currentRoom.map[y]?.[x + 1],
        currentRoom.map[y + 1]?.[x],
        currentRoom.map[y - 1]?.[x - 1],
        currentRoom.map[y - 1]?.[x + 1],
        currentRoom.map[y]?.[x],
        currentRoom.map[y + 1]?.[x - 1],
        currentRoom.map[y + 1]?.[x + 1],
      ];

      tiles.forEach((tile) => {
        if (!tile || !tile.model || !tile.model.hitbox) return;
        const A = e.hitBox;
        const B = tile.model.hitbox;

        const testAB = this.polygonPolygonSAT(A, B);
        if (!testAB.collision) return;

        const testBA = this.polygonPolygonSAT(B, A);
        if (!testBA.collision) return;
        testBA.axis.multiply(-1);

        const result = testAB.distance < testBA.distance ? testAB : testBA;
        if (result.distance) {
          e.hitBox.move(result.axis.clone().multiply(result.distance));
        }
      });
    }
  }

  projectileModelCollision() {
    const projectiles = this.Game.PlayerProjectiles.list;
    for (const p in projectiles) {
      const projectile = projectiles[p];
      const { currentRoom } = this.Game.FloorMap;
      if (!currentRoom) return;
      const { x, y } = projectile.currentTileCoords;
      const tiles = [
        currentRoom.map[y - 1]?.[x],
        currentRoom.map[y]?.[x - 1],
        currentRoom.map[y]?.[x + 1],
        currentRoom.map[y + 1]?.[x],
        currentRoom.map[y - 1]?.[x - 1],
        currentRoom.map[y - 1]?.[x + 1],
        currentRoom.map[y]?.[x],
        currentRoom.map[y + 1]?.[x - 1],
        currentRoom.map[y + 1]?.[x + 1],
      ];

      tiles.forEach((tile) => {
        if (!tile || !tile.model || !tile.model.hitbox) return;
        const polygon = tile.model.hitbox;
        const circle = projectile.hitBox;

        const result = this.circlePolygonSAT(circle, polygon);
        if (result.collision) projectile.remove();
      });
    }
  }

  projectileNpeCollision() {
    const projectiles = this.Game.PlayerProjectiles.list;
    const entities = this.Game.NonPlayerEntities.list;
    for (const key in projectiles) {
      const p = projectiles[key];
      for (const key in entities) {
        const e = entities[key];
        const polygon = e.hitBox;
        const circle = p.hitBox;

        const result = this.circlePolygonSAT(circle, polygon);
        if (result.collision) {
          p.remove();
          e.hit(p.damage);
        }
      }
    }
  }

  polygonPolygonSAT(hitbox1: PolygonHitbox, hitbox2: PolygonHitbox): satResult {
    let shortestDist = Number.MAX_VALUE;
    let shortestAxis = new Vector();
    const verts1 = hitbox1.getClonedVerts();
    const verts2 = hitbox2.getClonedVerts();

    for (let i = 0; i < verts1.length; i++) {
      const axis = this.getPerpendicularAxis(verts1, i);

      const hitbox1Range = this.projectVerts(axis, verts1);
      const hitbox2Range = this.projectVerts(axis, verts2);

      if (hitbox1Range.min - hitbox2Range.max > 0 || hitbox2Range.min - hitbox1Range.max > 0) {
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

  // shortestDist is wrong
  circlePolygonSAT(circle: CircleHitbox, polygon: PolygonHitbox): satResult {
    let shortestDist = Number.MAX_VALUE;
    let closestVert = new Vector();

    const verts = polygon.getClonedVerts();
    for (let vert of verts) {
      const dist = Math.pow(vert.x - circle.center.x, 2) + Math.pow(vert.y - circle.center.y, 2);
      if (dist < shortestDist) {
        shortestDist = dist;
        closestVert = vert.clone();
      }
    }

    let axis = new Vector([
      closestVert.x - circle.center.x,
      closestVert.y - circle.center.y,
    ]).normalize();

    let polygonRange = this.projectVerts(axis, verts);
    let circleRange = this.projectCircle(axis, circle);

    if (polygonRange.min - circleRange.max > 0 || circleRange.min - polygonRange.max > 0) {
      return { collision: false, axis, distance: shortestDist };
    }

    let distMin = circleRange.max - polygonRange.min;
    shortestDist = Math.abs(distMin);

    for (let i = 0; i < verts.length; i++) {
      axis = this.getPerpendicularAxis(verts, i);
      polygonRange = this.projectVerts(axis, verts);
      circleRange = this.projectCircle(axis, circle);

      if (polygonRange.min - circleRange.max > 0 || circleRange.min - polygonRange.max > 0) {
        shortestDist = polygonRange.max - circleRange.min;
        return { collision: false, axis, distance: shortestDist };
      }

      distMin = polygonRange.max - circleRange.min;
      let distMinAbs = Math.abs(distMin);
      if (distMinAbs < shortestDist) {
        shortestDist = distMinAbs;
      }
    }
    return { collision: true, axis, distance: shortestDist };
  }

  getPerpendicularAxis(verts: Vector[], i: number) {
    const p1 = verts[i];
    const p2 = i >= verts.length - 1 ? verts[0] : verts[i + 1];
    const axis = new Vector([-(p2.y - p1.y), p2.x - p1.x]);
    return axis.normalize();
  }

  projectCircle(axis: Vector, circle: CircleHitbox) {
    const proj = this.dotProduct(axis, circle.center);
    return {
      min: proj - circle.radius,
      max: proj + circle.radius,
    };
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

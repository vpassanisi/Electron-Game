import Vector from "renderer/vector";
import type { Container } from "Pixi.js";
import type Game from "renderer";

interface hitboxVerts {
  center: Vector;
  verts: Vector[];
}

interface hitboxDeltas {
  center: Vector;
  deltas: Vector[];
}

interface hitboxDimentions {
  center: Vector;
  height: number;
  width: number;
}

export interface HitboxArgs {
  Game: Game;
  hitboxDimentions?: hitboxDimentions;
  hitboxVerts?: hitboxVerts;
  hitboxDeltas?: hitboxDeltas;
}

export default class Hitbox {
  Game: Game;
  verts: Vector[];
  deltas: Vector[];
  center: Vector;

  constructor({ Game, hitboxDimentions, hitboxVerts, hitboxDeltas }: HitboxArgs) {
    this.Game = Game;

    this.verts = [];
    this.deltas = [];
    this.center = new Vector();
    if (hitboxDimentions) this.setDimentions(hitboxDimentions);
    if (hitboxVerts) this.setVerts(hitboxVerts);
    if (hitboxDeltas) this.setDeltas(hitboxDeltas);
  }

  setDimentions(hitboxDimentions: hitboxDimentions) {
    const { center, height, width } = hitboxDimentions;
    const halfHeight = height / 2;
    const halfWidth = width / 2;

    this.center = center;
    this.verts = [
      new Vector([center.x - halfWidth, center.y - halfHeight]),
      new Vector([center.x + halfWidth, center.y - halfHeight]),
      new Vector([center.x + halfWidth, center.y + halfHeight]),
      new Vector([center.x - halfWidth, center.y + halfHeight]),
    ];
    this.deltas = this.verts.map((v) => new Vector([this.center.x - v.x, this.center.y - v.y]));
  }

  setVerts(hitboxVerts: hitboxVerts) {
    const { center, verts } = hitboxVerts;
    this.verts = verts;
    this.center = center;
    this.deltas = this.verts.map((v) => new Vector([this.center.x - v.x, this.center.y - v.y]));
  }

  setDeltas(hitboxDeltas: hitboxDeltas) {
    const { center, deltas } = hitboxDeltas;
    this.deltas = deltas;
    this.center = center;
    this.verts = this.deltas.map((d) => new Vector([this.center.x + d.x, this.center.y + d.y]));
  }

  // prob breaks deltas
  scale(n: number) {
    this.verts.forEach((p) => {
      p.x = p.x - this.center.x;
      p.y = p.y - this.center.y;

      p.x = p.x * n;
      p.y = p.y * n;

      p.x = p.x + this.center.x;
      p.y = p.y + this.center.y;
    });
  }

  getClonedVerts() {
    return this.verts.map((vert) => vert.clone());
  }

  render() {
    if (this.Game.state.debug) {
      const path: number[] = [];
      this.verts.forEach((vert) => {
        path.push(vert.x);
        path.push(vert.y);
      });

      this.Game.FloorMap.currentRoom?.debugGraphics.beginFill(0xff00b8);
      this.Game.FloorMap.currentRoom?.debugGraphics.drawPolygon(path);
      this.Game.FloorMap.currentRoom?.debugGraphics.endFill();

      this.Game.FloorMap.currentRoom?.debugGraphics.beginFill(0xffffff);
      this.Game.FloorMap.currentRoom?.debugGraphics.drawCircle(this.center.x, this.center.y, 3);
      this.Game.FloorMap.currentRoom?.debugGraphics.endFill();
    } else {
      this.Game.FloorMap.currentRoom?.debugGraphics.clear();
    }
  }

  // prob breaks deltas
  move(v: Vector) {
    this.verts.forEach((p) => {
      p.x += v.x;
      p.y += v.y;
    });

    this.center.set([this.center.x + v.x, this.center.y + v.y]);
  }

  // prob breaks deltas
  moveTo(v: Vector) {
    this.center.set(v.value);
    this.verts = this.deltas.map((d) => new Vector([this.center.x + d.x, this.center.y + d.y]));
  }
}

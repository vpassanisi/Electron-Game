import Vector from "renderer/vector";
import type { Graphics, Container } from "Pixi.js";
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
  parent?: Container;
}

export default class Hitbox {
  Game: Game;
  verts: Vector[];
  deltas: Vector[];
  center: Vector;
  graphics: Graphics;
  parent: Container | null;

  constructor({ Game, hitboxDimentions, hitboxVerts, hitboxDeltas, parent }: HitboxArgs) {
    this.Game = Game;
    this.parent = parent || null;
    this.graphics = new Game.Pixi.Graphics();

    this.verts = [];
    this.deltas = [];
    this.center = new Vector();
    if (hitboxDimentions) this.setDimentions(hitboxDimentions);
    if (hitboxVerts) this.setVerts(hitboxVerts);
    if (hitboxDeltas) this.setDeltas(hitboxDeltas);

    this.graphics.zIndex = 999999;

    if (this.parent) this.parent.addChild(this.graphics);

    this.Game.Events.addListener("renderHitboxes", () => this.render());
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
    this.center.set([this.center.x / this.verts.length, this.center.y / this.verts.length]);
    this.deltas = this.verts.map((v) => new Vector([this.center.x - v.x, this.center.y - v.y]));
  }

  setDeltas(hitboxDeltas: hitboxDeltas) {
    const { center, deltas } = hitboxDeltas;
    this.deltas = deltas;
    this.center = center;
    this.verts = this.deltas.map((d) => new Vector([this.center.x + d.x, this.center.y + d.y]));
  }

  setParent(container: Container) {
    this.parent?.removeChild(this.graphics);
    this.parent = container;
    this.parent.addChild(this.graphics);
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

      this.graphics.clear();
      this.graphics.beginFill(0xff00b8);
      this.graphics.drawPolygon(path);
      this.graphics.endFill();

      this.graphics.beginFill(0xffffff);
      this.graphics.drawCircle(this.center.x, this.center.y, 3);
      this.graphics.endFill();
    } else {
      this.graphics.clear();
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

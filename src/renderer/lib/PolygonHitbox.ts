import Vector from "renderer/vector";
import type { Graphics } from "pixi.js";
import type Game from "renderer";

export default class Hitbox {
  Game: Game;
  verts: Vector[];
  center: Vector;
  graphics: Graphics;

  constructor(Game: Game, verts: Vector[]) {
    this.Game = Game;
    this.graphics = new Game.Pixi.Graphics();
    this.verts = verts;

    this.center = this.verts.reduce((prev, curr) => {
      return new Vector([prev.x + curr.x, prev.y + curr.y]);
    });
    this.center.set([
      this.center.x / this.verts.length,
      this.center.y / this.verts.length,
    ]);

    const path: number[] = [];
    this.verts.forEach((vert) => {
      path.push(vert.x);
      path.push(vert.y);
    });

    this.graphics.zIndex = this.Game.zIndex.player + 1;

    this.Game.Stage.addChild(this.graphics);

    this.Game.Events.element.addEventListener("renderHitboxes", () =>
      this.render()
    );
  }

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

  move(v: Vector) {
    this.verts.forEach((p) => {
      p.x += v.x;
      p.y += v.y;
    });

    this.center.set([this.center.x + v.x, this.center.y + v.y]);
  }

  moveTo(v: Vector) {}
}

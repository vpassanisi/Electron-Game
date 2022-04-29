import Vector from "renderer/vector";
import type { Graphics } from "pixi.js";
import type Game from "renderer";

export default class Hitbox {
  Game: Game;
  points: Vector[];
  edges: Vector[];
  center: Vector;
  p1: Vector;
  p2: Vector;
  p3: Vector;
  p4: Vector;
  graphics: Graphics;

  constructor(Game: Game, p1: Vector, p2: Vector, p3: Vector, p4: Vector) {
    this.Game = Game;
    this.graphics = new Game.Pixi.Graphics();
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    this.points = [p1, p2, p3, p4];

    this.edges = [
      new Vector([this.p1.x - this.p4.x, this.p1.y - this.p4.y]),
      new Vector([this.p2.x - this.p1.x, this.p2.y - this.p1.y]),
      new Vector([this.p3.x - this.p2.x, this.p3.y - this.p2.y]),
      new Vector([this.p4.x - this.p3.x, this.p4.y - this.p3.y]),
    ];

    this.center = this.points.reduce((prev, curr) => {
      return new Vector([prev.x + curr.x, prev.y + curr.y]);
    });
    this.center.set([
      this.center.x / this.points.length,
      this.center.y / this.points.length,
    ]);

    this.graphics.zIndex = this.Game.zIndex.player + 1;
    this.graphics.beginFill(0xff00b8);
    this.graphics.drawPolygon(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    this.graphics.endFill();

    this.graphics.beginFill(0xffffff);
    this.graphics.drawCircle(this.center.x, this.center.y, 3);
    this.graphics.endFill();

    this.Game.Stage.addChild(this.graphics);
  }

  scale(n: number) {
    this.points.forEach((p) => {
      p.x = p.x - this.center.x;
      p.y = p.y - this.center.y;

      p.x = p.x * n;
      p.y = p.y * n;

      p.x = p.x + this.center.x;
      p.y = p.y + this.center.y;
    });
  }

  move(v: Vector) {
    this.points.forEach((p) => {
      p.x += v.x;
      p.y += v.y;
    });

    this.edges = [
      new Vector([this.p1.x - this.p4.x, this.p1.y - this.p4.y]),
      new Vector([this.p2.x - this.p1.x, this.p2.y - this.p1.y]),
      new Vector([this.p3.x - this.p2.x, this.p3.y - this.p2.y]),
      new Vector([this.p4.x - this.p3.x, this.p4.y - this.p3.y]),
    ];

    this.center.set([this.center.x + v.x, this.center.y + v.y]);

    this.graphics.clear();
    this.graphics.beginFill(0xff00b8);
    this.graphics.drawPolygon(
      this.p1.x,
      this.p1.y,
      this.p2.x,
      this.p2.y,
      this.p3.x,
      this.p3.y,
      this.p4.x,
      this.p4.y
    );
    this.graphics.endFill();

    this.graphics.beginFill(0xffffff);
    this.graphics.drawCircle(this.center.x, this.center.y, 3);
    this.graphics.endFill();
  }
}

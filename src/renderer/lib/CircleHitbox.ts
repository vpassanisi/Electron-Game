import Vector from "renderer/vector";
import type { Graphics, Container } from "Pixi.js";
import type Game from "renderer";

export default class Hitbox {
  Game: Game;
  radius: number;
  center: Vector;
  graphics: Graphics;
  parent: Container;

  constructor(Game: Game, parent: Container, center: Vector, radius: number) {
    this.Game = Game;
    this.parent = parent;
    this.graphics = new Game.Pixi.Graphics();
    this.radius = radius;

    this.center = center;

    this.graphics.zIndex = this.Game.zIndex.player + 1;

    parent.addChild(this.graphics);

    this.Game.Events.addListener("renderHitboxes", () => this.render());
  }

  scale(n: number) {
    this.radius += n;
  }

  getClonedCenter() {
    return this.center.clone();
  }

  render() {
    if (this.Game.state.debug) {
      this.graphics.clear();
      this.graphics.beginFill(0xff00b8);
      this.graphics.drawCircle(this.center.x, this.center.y, this.radius);
      this.graphics.endFill();

      this.graphics.beginFill(0xffffff);
      this.graphics.drawCircle(this.center.x, this.center.y, 3);
      this.graphics.endFill();
    } else {
      this.graphics.clear();
    }
  }

  move(v: Vector) {
    this.center.set([this.center.x + v.x, this.center.y + v.y]);
  }

  remove() {
    this.graphics.clear();
    this.parent.removeChild(this.graphics);
  }
}

import Vector from "renderer/vector";
import type Game from "renderer";

interface args {
  Game: Game;
  center: Vector;
  radius: number;
}

export default class Hitbox {
  Game: Game;
  radius: number;
  center: Vector;

  constructor({ Game, center, radius }: args) {
    this.Game = Game;
    this.radius = radius;
    this.center = center;
  }

  scale(n: number) {
    this.radius += n;
  }

  getClonedCenter() {
    return this.center.clone();
  }

  render() {
    if (this.Game.state.debug) {
      this.Game.FloorMap.currentRoom?.debugGraphics.beginFill(0xff00b8);
      this.Game.FloorMap.currentRoom?.debugGraphics.drawCircle(
        this.center.x,
        this.center.y,
        this.radius
      );
      this.Game.FloorMap.currentRoom?.debugGraphics.endFill();

      this.Game.FloorMap.currentRoom?.debugGraphics.beginFill(0xffffff);
      this.Game.FloorMap.currentRoom?.debugGraphics.drawCircle(this.center.x, this.center.y, 3);
      this.Game.FloorMap.currentRoom?.debugGraphics.endFill();
    } else {
      this.Game.FloorMap.currentRoom?.debugGraphics.clear();
    }
  }

  move(v: Vector) {
    this.center.set([this.center.x + v.x, this.center.y + v.y]);
  }
}

import type Player from "../player";
import Vector from "../vector.js";

export class Entity {
  root: HTMLElement;
  center: HTMLElement;
  positionLeft: number;
  positionTop: number;
  height: number;
  width: number;
  direction: Vector;
  queue: { (player: Player): string }[];

  constructor() {
    this.center = document.createElement("div");
    this.direction = new Vector([0, 0]);
  }
  get leftSide() {
    return this.positionLeft - this.width / 2;
  }
  get rightSide() {
    return this.positionLeft + this.width / 2;
  }
  get topSide() {
    return this.positionTop - this.height / 2;
  }
  get bottomSide() {
    return this.positionTop + this.height / 2;
  }

  update(player: Player): boolean {
    return true;
  }

  hit(damage: number): void {}

  nonPlayerCollision(nonPlayerEntity: Entity) {}

  playerCollision(player: Player): () => string {
    const x = () => "";
    return x;
  }

  render() {}
}

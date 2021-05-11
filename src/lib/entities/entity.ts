import type Player from "../player";
import Vector from "../vector.js";
import type { GameType } from "../../types";

export class Entity {
  positionLeft: number;
  positionTop: number;
  height: number;
  width: number;
  direction: Vector;
  sprite: HTMLCanvasElement;
  spriteWidth: number;
  spriteHeight: number;
  game: GameType;
  queue: { (player: Player): string }[];

  constructor(game: GameType) {
    this.game = game;
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

  open() {}
}

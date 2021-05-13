import type Player from "../player";
import type { Entity } from "../entities";
import type { GameType } from "../../types";

/**
 * A Model is stationary and does not check for collisions with other models or entitites,
 * but other entities check for collisions with a Model
 */
export class Model {
  positionLeft: number;
  positionTop: number;
  height: number;
  width: number;
  sprite: HTMLCanvasElement;
  spriteWidth: number;
  spriteHeight: number;
  game: GameType;
  queue: { (player: Player): string }[];

  constructor(game: GameType) {
    this.game = game;
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

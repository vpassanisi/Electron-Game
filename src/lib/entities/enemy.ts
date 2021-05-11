import { Entity } from "./entity.js";
import Vector from "../vector.js";
import type Player from "../player";
import { GameType } from "../../types";

export class Enemy extends Entity {
  direction: Vector;
  speed: number;
  friction: number;
  size: number;
  hp: number;
  flashFrames: number;

  constructor(game: GameType, positionLeft: number, positionTop: number) {
    super(game);

    this.direction = new Vector([0, 0]);
    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.size = 0.8;

    this.height = (this.game.camera.offsetHeight / 9) * this.size;
    this.width = (this.game.camera.offsetWidth / 15) * this.size;
    this.spriteHeight = 16;
    this.spriteWidth = 16;

    this.speed = 4;
    this.friction = 3;

    this.hp = 10;
    this.flashFrames = 0;

    this.queue = [
      (player: Player) => {
        this.direction.add(
          new Vector([
            player.positionLeft - this.positionLeft,
            player.positionTop - this.positionTop,
          ]).scaleTo(1)
        );
        return "persist";
      },
      () => {
        this.direction.multiply(this.speed * 0.1);
        return "persist";
      },
      () => {
        this.direction.multiply(this.friction * 0.1);
        return "persist";
      },
      () => {
        this.direction.clamp(this.speed * 0.3);
        return "persist";
      },
    ];
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

  setPositionLeft(x: number) {
    this.positionLeft = x + this.width / 2;
  }
  setPositionRight(x: number) {
    this.positionLeft = x - this.width / 2;
  }
  setPositionTop(x: number) {
    this.positionTop = x + this.height / 2;
  }
  setPositionBottom(x: number) {
    this.positionTop = x - this.height / 2;
  }

  update(player: Player) {
    if (this.hp === 0) return false;

    for (let i = 0; i < this.queue.length; i++) {
      const type = this.queue[i](player);
      if (type !== "persist") this.queue.splice(i, 1);
    }

    this.positionLeft += this.direction.x;
    this.positionTop += this.direction.y;

    return true;
  }

  nonPlayerCollision(otherEntity: Entity) {
    const left = Math.abs(otherEntity.rightSide - this.leftSide);
    const right = Math.abs(otherEntity.leftSide - this.rightSide);
    const top = Math.abs(otherEntity.bottomSide - this.topSide);
    const bottom = Math.abs(otherEntity.topSide - this.bottomSide);

    const smallest = Math.min(right, left, top, bottom);

    if (right === smallest) {
      this.setPositionRight(otherEntity.leftSide);
      this.direction.x = 0;
    }
    if (left === smallest) {
      this.setPositionLeft(otherEntity.rightSide);
      this.direction.x = 0;
    }
    if (top === smallest) {
      this.setPositionTop(otherEntity.bottomSide);
      this.direction.y = 0;
    }
    if (bottom === smallest) {
      this.setPositionBottom(otherEntity.topSide);
      this.direction.y = 0;
    }
  }

  hit(damage: number) {
    this.hp -= damage;
  }

  playerCollision(player: Player) {
    const callback = () => {
      player.direction.add(
        new Vector([
          player.positionLeft - this.positionLeft,
          player.positionTop - this.positionTop,
        ]).scaleTo(1)
      );

      return "break";
    };

    return callback;
  }

  render() {
    if (this.hp) {
      this.game.ctx.drawImage(
        this.game.envSpriteSheet,
        96,
        272,
        this.spriteHeight,
        this.spriteWidth,
        this.positionLeft - this.width / 2,
        this.positionTop - this.height / 2,
        this.height,
        this.width
      );
    }
  }
}

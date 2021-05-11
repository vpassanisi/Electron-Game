import Vector from "./vector.js";
import { Projectile } from "./entities/index.js";
import type { GameType } from "../types";

export default class Player {
  positionLeft: number;
  positionTop: number;
  height: number;
  width: number;
  speed: number;
  friction: number;
  direction: Vector;
  size: number;
  spriteHeight: number;
  spriteWidth: number;
  game: GameType;
  hitboxScalarX: number;
  hitboxScalarY: number;
  queue: { (): string }[];

  constructor(
    game: GameType,
    positionLeft?: number,
    positionTop?: number,
    size = 4,
    speed = 15
  ) {
    this.size = size;
    this.game = game;

    this.spriteWidth = 16;
    this.spriteHeight = 16;
    this.width = this.spriteWidth * this.size;
    this.height = this.spriteHeight * this.size;
    this.positionLeft = positionLeft || 100;
    this.positionTop = positionTop || 100;
    this.speed = speed;
    this.hitboxScalarX = 4;
    this.hitboxScalarY = 3;

    this.friction = 9;

    this.direction = new Vector([0, 0]);

    this.queue = [
      () => {
        const analog = new Vector([
          this.game.gamepad.controller.axes[0],
          this.game.gamepad.controller.axes[1],
        ])
          .deadZone()
          .multiply(this.speed * 0.1);

        // console.log(
        //   new Vector([
        //     this.game.gamepad.controller.axes[0],
        //     this.game.gamepad.controller.axes[1],
        //   ])
        // );

        this.direction.add(analog);

        return "persist";
      },
      () => {
        // slow down the player smoothly
        this.direction.multiply(this.friction * 0.1);

        return "persist";
      },
      () => {
        this.direction.quantize();
        this.direction.clamp(this.speed);

        return "persist";
      },
    ];
  }

  get leftSide() {
    return this.positionLeft - this.hitboxScalarX * this.size;
  }
  get rightSide() {
    return this.positionLeft + this.hitboxScalarX * this.size;
  }
  get topSide() {
    return this.positionTop - this.hitboxScalarY * this.size;
  }
  get bottomSide() {
    return this.positionTop + this.hitboxScalarY * this.size;
  }

  setPositionLeft(x: number) {
    this.positionLeft = x + this.hitboxScalarX * this.size;
  }
  setPositionRight(x: number) {
    this.positionLeft = x - this.hitboxScalarX * this.size;
  }
  setPositionTop(x: number) {
    this.positionTop = x + this.hitboxScalarY * this.size;
  }
  setPositionBottom(x: number) {
    this.positionTop = x - this.hitboxScalarY * this.size;
  }

  update() {
    for (let i = 0; i < this.queue.length; i++) {
      const action = this.queue[i]();
      if (action !== "persist") this.queue.splice(i, 1);
      if (action === "break") break;
    }

    this.positionLeft += this.direction.x;
    this.positionTop += this.direction.y;
  }

  adjustSpeed(ammount: number) {
    this.speed += ammount;
    if (this.speed < 0) this.speed = 0;
    this.speed = Math.round(this.speed * 100) / 100;
    return this.speed;
  }

  adjustFriction(ammount: number) {
    this.friction += ammount;
    if (this.friction < 0) this.friction = 0;
    this.friction = Math.round(this.friction * 100) / 100;
    return this.friction;
  }

  adjustSize(ammount: number) {
    this.size += ammount;
  }

  collision(callback: () => string) {
    callback();
  }

  render() {
    this.game.ctx.drawImage(
      this.game.playerSpriteSheet,
      0,
      0,
      this.spriteHeight,
      this.spriteWidth,
      this.positionLeft - this.width / 2 - 4,
      this.positionTop - this.height / 2 - 16,
      this.height,
      this.width
    );
    if (this.game.state.debug) {
      this.game.ctx.fillStyle = "#fc03fcBB";
      this.game.ctx.fillRect(
        this.positionLeft - this.hitboxScalarX * this.size,
        this.positionTop - this.hitboxScalarY * this.size,
        this.hitboxScalarX * this.size * 2,
        this.hitboxScalarY * this.size * 2
      );
    }
  }

  fire(direction: string) {
    switch (true) {
      case direction === "up":
        this.game.playerEntities[this.game.playerEntities.length] =
          new Projectile(
            this.game,
            new Vector([this.direction.x / 10, -5]),
            this.positionLeft,
            this.topSide,
            4
          );
        break;
      case direction === "down":
        this.game.playerEntities[this.game.playerEntities.length] =
          new Projectile(
            this.game,
            new Vector([this.direction.x / 10, 5]),
            this.positionLeft,
            this.bottomSide,
            4
          );
        break;
      case direction === "left":
        this.game.playerEntities[this.game.playerEntities.length] =
          new Projectile(
            this.game,
            new Vector([-5, this.direction.y / 10]),
            this.leftSide,
            this.positionTop,
            4
          );
        break;
      case direction === "right":
        this.game.playerEntities[this.game.playerEntities.length] =
          new Projectile(
            this.game,
            new Vector([5, this.direction.y / 10]),
            this.rightSide,
            this.positionTop,
            4
          );
        break;
      default:
        console.log("not a direction");
        break;
    }
  }
}

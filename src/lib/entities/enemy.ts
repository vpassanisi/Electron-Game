import { Entity } from "./entity.js";
import Vector from "../vector.js";
import type Player from "../player";

export class Enemy extends Entity {
  direction: Vector;
  speed: number;
  friction: number;
  hitBox: HTMLElement;
  hp: number;
  flashFrames: number;

  constructor(positionLeft: number, positionTop: number) {
    super();

    this.root = document.getElementById("app");

    this.direction = new Vector([0, 0]);
    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.height = this.root.offsetHeight / 7 - 20;
    this.width = this.root.offsetWidth / 13 - 20;

    this.speed = 4;
    this.friction = 3;

    this.hitBox = document.createElement("div");
    this.center.appendChild(this.hitBox);

    this.center.style.position = "absolute";
    this.center.style.height = "1px";
    this.center.style.width = "1px";
    this.center.style.left = `${this.positionLeft}px`;
    this.center.style.top = `${this.positionTop}px`;
    this.center.style.backgroundColor = "black";

    this.hitBox.style.height = `${this.height}px`;
    this.hitBox.style.width = `${this.width}px`;
    this.hitBox.style.position = "relative";
    this.hitBox.style.top = `-${this.height / 2}px`;
    this.hitBox.style.left = `-${this.width / 2}px`;
    this.hitBox.style.backgroundColor = "#ff0000";

    this.root.appendChild(this.center);

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
      () => {
        if (this.flashFrames) {
          this.flashFrames -= 1;
          this.hitBox.style.backgroundColor = "#fff";
        } else {
          this.hitBox.style.backgroundColor = "#ff0000";
        }

        return "persist";
      },
    ];
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
    const away = new Vector([
      otherEntity.positionLeft - this.positionLeft,
      otherEntity.positionTop - this.positionTop,
    ]).direction();

    if (away === "down") {
      this.positionTop = otherEntity.positionTop - otherEntity.height / 2 - this.height / 2;
    }
    if (away === "up") {
      this.positionTop = otherEntity.positionTop + otherEntity.height / 2 + this.height / 2;
    }
    if (away === "right") {
      this.positionLeft = otherEntity.positionLeft - otherEntity.width / 2 - this.width / 2;
    }
    if (away === "left") {
      this.positionLeft = otherEntity.positionLeft + otherEntity.width / 2 + this.width / 2;
    }
  }

  hit(damage: number) {
    this.hp -= damage;

    this.flashFrames = 3;
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
    this.center.style.left = `${this.positionLeft}px`;
    this.center.style.top = `${this.positionTop}px`;
  }
}

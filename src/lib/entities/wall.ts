import { Entity } from "./entity.js";
import type Player from "../player";
import { GameType } from "../../types";

export class Wall extends Entity {
  spriteX: number;
  spriteY: number;
  constructor(game: GameType, positionLeft: number, positionTop: number, type?: string) {
    super(game);

    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.height = this.game.camera.offsetHeight / 9;
    this.width = this.game.camera.offsetWidth / 15;
    this.spriteHeight = 16;
    this.spriteWidth = 16;

    switch (type) {
      case "T":
        this.spriteX = 16;
        this.spriteY = 32;
        break;
      case "TL":
        this.spriteX = 48;
        this.spriteY = 0;
        break;
      case "TR":
        this.spriteX = 80;
        this.spriteY = 0;
        break;
      case "R":
        this.spriteX = 0;
        this.spriteY = 16;
        break;
      case "L":
        this.spriteX = 32;
        this.spriteY = 16;
        break;
      case "BR":
        this.spriteX = 80;
        this.spriteY = 32;
        break;
      case "BL":
        this.spriteX = 48;
        this.spriteY = 32;
        break;
      case "B":
        this.spriteX = 16;
        this.spriteY = 0;
        break;
      default:
        this.spriteX = 0;
        this.spriteY = 0;
        break;
    }
  }

  update(player: Player) {
    return true;
  }

  hit(damage: number) {}

  nonPlayerCollision() {}

  render() {
    this.game.ctx.drawImage(
      this.game.envSpriteSheet,
      this.spriteX,
      this.spriteY,
      this.spriteHeight,
      this.spriteWidth,
      this.positionLeft - this.height / 2,
      this.positionTop - this.width / 2,
      this.height,
      this.width
    );
  }

  playerCollision(player: Player) {
    const callback = () => {
      const left = Math.abs(player.rightSide - this.leftSide);
      const right = Math.abs(player.leftSide - this.rightSide);
      const top = Math.abs(player.bottomSide - this.topSide);
      const bottom = Math.abs(player.topSide - this.bottomSide);

      const smallest = Math.min(right, left, top, bottom);

      if (right === smallest) {
        player.setPositionLeft(this.rightSide);
        player.direction.x = 0;
      } else if (left === smallest) {
        player.setPositionRight(this.leftSide);
        player.direction.x = 0;
      } else if (top === smallest) {
        player.setPositionBottom(this.topSide);
        player.direction.y = 0;
      } else if (bottom === smallest) {
        player.setPositionTop(this.bottomSide);
        player.direction.y = 0;
      }

      return "break";
    };

    return callback;
  }
}

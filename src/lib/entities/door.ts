import { Entity } from "./entity.js";
import type Player from "../player";
import type { GameType } from "../../types";

export class Door extends Entity {
  game: GameType;
  isOpen: boolean;
  openSpriteX: number;
  openSpriteY: number;
  closedSpriteX: number;
  closedspreiteY: number;
  type: string;
  constructor(game: GameType, positionLeft: number, positionTop: number, type: string) {
    super(game);

    this.isOpen = false;

    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.height = this.game.camera.offsetHeight / 9;
    this.width = this.game.camera.offsetWidth / 15;
    this.spriteHeight = 16;
    this.spriteWidth = 16;
    this.type = type;

    switch (this.type) {
      case "L":
        this.openSpriteX = 240;
        this.openSpriteY = 16;
        this.closedSpriteX = 208;
        this.closedspreiteY = 16;
        break;
      case "R":
        this.openSpriteX = 240;
        this.openSpriteY = 0;
        this.closedSpriteX = 192;
        this.closedspreiteY = 0;
        break;
      case "T":
        this.openSpriteX = 224;
        this.openSpriteY = 16;
        this.closedSpriteX = 192;
        this.closedspreiteY = 16;
        break;
      case "B":
        this.openSpriteX = 224;
        this.openSpriteY = 0;
        this.closedSpriteX = 208;
        this.closedspreiteY = 0;
        break;
      default:
        this.openSpriteX = 0;
        this.openSpriteY = 0;
        this.closedSpriteX = 0;
        this.closedspreiteY = 0;
        break;
    }
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

  update(player: Player) {
    return true;
  }

  hit(damage: number) {}

  nonPlayerCollision() {}

  render() {
    this.game.ctx.drawImage(
      this.game.envSpriteSheet,
      this.isOpen ? this.openSpriteX : this.closedSpriteX,
      this.isOpen ? this.openSpriteY : this.closedspreiteY,
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
      const right = Math.abs(player.rightSide - this.leftSide);
      const left = Math.abs(player.leftSide - this.rightSide);
      const bottom = Math.abs(player.bottomSide - this.topSide);
      const top = Math.abs(player.topSide - this.bottomSide);

      const smallest = Math.min(right, left, top, bottom);

      if (right === smallest) {
        if (!this.isOpen) {
          player.setPositionRight(this.leftSide);
          player.direction.x = 0;
        } else {
          this.game.loadRoomToTheRight();
        }
      } else if (left === smallest) {
        if (!this.isOpen) {
          player.setPositionLeft(this.rightSide);
          player.direction.x = 0;
        } else {
          this.game.loadRoomToTheLeft();
        }
      } else if (top === smallest) {
        if (!this.isOpen) {
          player.setPositionTop(this.bottomSide);
          player.direction.y = 0;
        } else {
          this.game.loadRoomToTheTop();
        }
      } else if (bottom === smallest) {
        if (!this.isOpen) {
          player.setPositionBottom(this.topSide);
          player.direction.y = 0;
        } else {
          this.game.loadRoomToTheBottom();
        }
      }

      return "";
    };

    return callback;
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }
}

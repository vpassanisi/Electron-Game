import type { Texture, Sprite, Graphics, Container } from "Pixi.js";
import type Game from "../index";
import Vector from "../vector";
import Model from "./world/Model/Model";

export default class Player {
  x: number;
  y: number;
  speed: number;
  friction: number;
  direction: Vector;
  texture: Texture | undefined;
  container: Container;
  sprite: Sprite;
  scalar: number;
  Game: Game;
  hitBox: Graphics;
  currentTileCoords: Vector;

  constructor(Game: Game) {
    this.x = Game.canvas.offsetWidth / 2;
    this.y = Game.canvas.offsetHeight / 2;
    this.speed = 20;
    this.friction = 0.9;
    this.direction = new Vector([0, 0]);
    this.scalar = Game.Renderer.view.width / 200;
    this.Game = Game;
    this.container = new Game.Pixi.Container();
    this.container.position.set(this.x, this.y);
    this.currentTileCoords = new Vector();
    this.setCurrentTileCoords();

    this.texture = new Game.Pixi.Texture(
      Game.Assets.playerBaseTexture,
      new Game.Pixi.Rectangle(0, 0, 16, 16)
    );
    this.sprite = new Game.Pixi.Sprite(this.texture);
    // this.sprite.anchor.set(0.5);
    this.sprite.scale.set(this.scalar, this.scalar);
    this.container.addChild(this.sprite);

    this.hitBox = new this.Game.Pixi.Graphics();
    this.hitBox.beginFill(0xff00b8);
    this.hitBox.drawRect(0, 0, this.sprite.width, this.sprite.height);
    this.container.addChild(this.hitBox);

    Game.Stage.addChild(this.container);
  }

  get leftSide() {
    return this.x;
  }
  get rightSide() {
    return this.x + this.container.width;
  }
  get topSide() {
    return this.y;
  }
  get bottomSide() {
    return this.y + this.container.height;
  }

  setPositionOfLeft(coord: number) {
    this.x = coord;
  }
  setPositionOfRight(coord: number) {
    this.x = coord - this.container.width;
  }
  setPositionOfTop(coord: number) {
    this.y = coord;
  }
  setPositionOfBottom(coord: number) {
    this.y = coord - this.container.height;
  }

  modelCollision(model: Model) {
    const left = Math.abs(this.rightSide - model.leftSide);
    const right = Math.abs(this.leftSide - model.rightSide);
    const top = Math.abs(this.bottomSide - model.topSide);
    const bottom = Math.abs(this.topSide - model.bottomSide);

    const smallest = Math.min(right, left, top, bottom);

    if (right === smallest) {
      this.direction.x = 0;
      this.setPositionOfLeft(model.rightSide);
    } else if (left === smallest) {
      this.direction.x = 0;
      this.setPositionOfRight(model.leftSide);
    } else if (top === smallest) {
      this.direction.y = 0;
      this.setPositionOfBottom(model.topSide);
    } else if (bottom === smallest) {
      this.direction.y = 0;
      this.setPositionOfTop(model.bottomSide);
    }
  }

  drawHitBox() {}

  setCurrentTileCoords() {
    const position = new Vector([
      this.container.x + this.container.width / 2,
      this.container.y + this.container.height / 2,
    ]);

    const tileWidth = this.Game.canvas.offsetWidth / 15;
    const tileHeight = this.Game.canvas.offsetHeight / 9;

    this.currentTileCoords.x = Math.floor(position.x / tileWidth);
    this.currentTileCoords.y = Math.floor(position.y / tileHeight);
  }

  update(Game: Game) {
    const analog = new Vector([
      Game.Controller.state?.axes[0] ?? 0,
      Game.Controller.state?.axes[1] ?? 0,
    ]).multiply(this.speed * 0.1);

    this.direction.add(analog);

    // slow down the player smoothly
    this.direction.multiply(this.friction);

    this.direction.quantize();
    this.direction.clamp(this.speed);

    this.x += this.direction.x;
    this.y += this.direction.y;

    this.setCurrentTileCoords();
  }

  move() {
    this.container.position.set(this.x, this.y);
  }

  fire(direction: string) {
    console.log(direction);
  }
}

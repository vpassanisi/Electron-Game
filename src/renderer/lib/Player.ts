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
  shouldCheckCollision: boolean;
  currentTileCoords: Vector;

  constructor(Game: Game) {
    this.x = Game.root.offsetWidth / 2;
    this.y = Game.root.offsetHeight / 2;
    this.speed = 20;
    this.friction = 0.9;
    this.direction = new Vector([0, 0]);
    this.scalar = Game.pixiApp.view.width / 200;
    this.Game = Game;
    this.container = new Game.Pixi.Container();
    this.container.position.set(this.x, this.y);
    this.shouldCheckCollision = true;
    this.currentTileCoords = new Vector();
    this.setCurrentTileCoords();

    this.texture = new Game.Pixi.Texture(
      Game.playerBaseTexture,
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

    Game.pixiApp.stage.addChild(this.container);
  }

  get leftSide() {
    return this.container.x;
  }
  get rightSide() {
    return this.container.x + this.container.width;
  }
  get topSide() {
    return this.container.y;
  }
  get bottomSide() {
    return this.container.y + this.container.height;
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
      this.setPositionOfLeft(model.rightSide);
      this.direction.x = 0;
    } else if (left === smallest) {
      this.setPositionOfRight(model.leftSide);
      this.direction.x = 0;
    } else if (top === smallest) {
      this.setPositionOfBottom(model.topSide);
      this.direction.y = 0;
    } else if (bottom === smallest) {
      this.setPositionOfTop(model.bottomSide);
      this.direction.y = 0;
    }
    this.shouldCheckCollision = false;
  }

  drawHitBox() {}

  setCurrentTileCoords() {
    const position = new Vector([
      this.container.x + this.container.width / 2,
      this.container.y + this.container.height / 2,
    ]);

    const tileWidth = this.Game.root.offsetWidth / 15;
    const tileHeight = this.Game.root.offsetHeight / 9;

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

    this.setCurrentTileCoords();
  }

  render() {
    this.shouldCheckCollision = true;
    this.x += this.direction.x;
    this.y += this.direction.y;
    this.container.position.set(this.x, this.y);
  }

  fire(direction: string) {
    console.log(direction);
  }
}

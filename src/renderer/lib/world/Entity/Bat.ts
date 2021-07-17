import Game from "src/renderer";
import Vector from "../../../Vector";
import Model from "../Model/Model";
import type { Texture, Sprite, Container, Graphics } from "pixi.js";
import type Entity from "./Entity";

export default class Bat implements Entity {
  position: Vector;
  speed: number;
  friction: number;
  direction: Vector;
  texture: Texture;
  container: Container;
  sprite: Sprite;
  Game: Game;
  hitBox: Graphics;

  constructor(Game: Game, coords: Vector) {
    this.position = new Vector([
      (Game.canvas.offsetWidth / 15) * coords.x,
      (Game.canvas.offsetHeight / 9) * coords.y,
    ]);
    this.speed = 10;
    this.friction = 0.9;
    this.direction = new Vector([0, 0]);
    this.Game = Game;

    this.container = new Game.Pixi.Container();
    this.container.position.set(...this.position.value);
    this.texture = Game.Assets.batTexture;
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.scale.set(4, 4);

    this.hitBox = new this.Game.Pixi.Graphics();
    this.hitBox.beginFill(0xff00b8);
    this.hitBox.drawRect(0, 0, this.sprite.width, this.sprite.height);

    this.container.addChild(this.sprite);
    this.container.addChild(this.hitBox);

    Game.Stage.addChild(this.container);
  }

  get leftSide() {
    return this.position.x;
  }
  get rightSide() {
    return this.position.x + this.container.width;
  }
  get topSide() {
    return this.position.y;
  }
  get bottomSide() {
    return this.position.y + this.container.height;
  }

  get currentTileCoords() {
    return new Vector([
      Math.floor(
        (this.container.x + this.container.width / 2) / (this.Game.canvas.offsetWidth / 15)
      ),
      Math.floor(
        (this.container.y + this.container.height / 2) / (this.Game.canvas.offsetHeight / 9)
      ),
    ]);
  }

  setPositionOfLeft(coord: number) {
    this.position.x = coord;
  }
  setPositionOfRight(coord: number) {
    this.position.x = coord - this.container.width;
  }
  setPositionOfTop(coord: number) {
    this.position.y = coord;
  }
  setPositionOfBottom(coord: number) {
    this.position.y = coord - this.container.height;
  }

  modelCollision(model: Model) {
    const left = Math.abs(this.rightSide - model.leftSide);
    const right = Math.abs(this.leftSide - model.rightSide);
    const top = Math.abs(this.bottomSide - model.topSide);
    const bottom = Math.abs(this.topSide - model.bottomSide);

    const smallest = Math.min(right, left, top, bottom);

    switch (true) {
      case right === smallest:
        this.direction.x = 0;
        this.setPositionOfLeft(model.rightSide);
        break;
      case left === smallest:
        this.direction.x = 0;
        this.setPositionOfRight(model.leftSide);
        break;
      case top === smallest:
        this.direction.y = 0;
        this.setPositionOfBottom(model.topSide);
        break;
      case bottom === smallest:
        this.direction.y = 0;
        this.setPositionOfTop(model.bottomSide);
        break;
    }
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

    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  move() {
    this.container.position.set(...this.position.value);
  }

  toggleHitBox() {
    this.hitBox.visible = !this.hitBox.visible;
  }
}

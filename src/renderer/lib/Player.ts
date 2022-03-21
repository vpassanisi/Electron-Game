import type { Texture, Sprite } from "Pixi.js";
import type Game from "../index";
import Vector from "../Vector";
import Entity from "./world/Entity/Entity";
import Model from "./world/Model/Model";

export default class Player {
  speed: number;
  friction: number;
  direction: Vector;
  texture: Texture;
  sprite: Sprite;
  scalar: number;
  Game: Game;
  hitBox: Sprite;

  constructor(Game: Game) {
    this.speed = 20;
    this.friction = 0.9;
    this.direction = new Vector([0, 0]);
    this.scalar = 5;
    this.Game = Game;

    this.texture = new Game.Pixi.Texture(
      Game.Assets.playerBaseTexture,
      new Game.Pixi.Rectangle(0, 0, 16, 16)
    );
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.scale.set(this.scalar, this.scalar);
    this.sprite.anchor.set(0.33, 0.6);
    this.sprite.position.set(Game.canvas.offsetWidth / 2, Game.canvas.offsetHeight / 2);

    this.hitBox = new this.Game.Pixi.Sprite(Game.Pixi.Texture.WHITE);
    this.hitBox.tint = 0xff00b8;
    this.hitBox.scale.set(this.scalar / 2.25, this.scalar / 2.75);
    this.hitBox.position.set(Game.canvas.offsetWidth / 2, Game.canvas.offsetHeight / 2);

    Game.Stage.addChild(this.sprite);
    Game.Stage.addChild(this.hitBox);
  }

  get leftSide() {
    return this.hitBox.x;
  }
  get rightSide() {
    return this.hitBox.x + this.hitBox.width;
  }
  get topSide() {
    return this.hitBox.y;
  }
  get bottomSide() {
    return this.hitBox.y + this.hitBox.height;
  }

  get currentTileCoords() {
    return new Vector([
      Math.floor((this.hitBox.x + this.hitBox.width / 2) / (this.Game.canvas.offsetWidth / 15)),
      Math.floor((this.hitBox.y + this.hitBox.height / 2) / (this.Game.canvas.offsetHeight / 9)),
    ]);
  }

  setPositionOfLeft(coord: number) {
    this.hitBox.position.set(coord, this.hitBox.position.y);
  }
  setPositionOfRight(coord: number) {
    this.hitBox.position.set(coord - this.hitBox.width, this.hitBox.position.y);
  }
  setPositionOfTop(coord: number) {
    this.hitBox.position.set(this.hitBox.position.x, coord);
  }
  setPositionOfBottom(coord: number) {
    this.hitBox.position.set(this.hitBox.position.x, coord - this.hitBox.height);
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

  entityCollision(entity: Entity) {
    const left = Math.abs(this.rightSide - entity.leftSide);
    const right = Math.abs(this.leftSide - entity.rightSide);
    const top = Math.abs(this.bottomSide - entity.topSide);
    const bottom = Math.abs(this.topSide - entity.bottomSide);

    const smallest = Math.min(right, left, top, bottom);

    switch (true) {
      case right === smallest:
        this.direction.x = 0;
        this.setPositionOfLeft(entity.rightSide);
        break;
      case left === smallest:
        this.direction.x = 0;
        this.setPositionOfRight(entity.leftSide);
        break;
      case top === smallest:
        this.direction.y = 0;
        this.setPositionOfBottom(entity.topSide);
        break;
      case bottom === smallest:
        this.direction.y = 0;
        this.setPositionOfTop(entity.bottomSide);
        break;
    }
  }

  toggleHitBox() {
    this.hitBox.visible = !this.hitBox.visible;
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

    this.hitBox.position.set(
      this.hitBox.position.x + this.direction.x,
      this.hitBox.position.y + this.direction.y
    );
  }

  move() {
    this.sprite.position.set(this.hitBox.x, this.hitBox.y);
  }

  fire(direction: string) {
    console.log(direction);
  }
}

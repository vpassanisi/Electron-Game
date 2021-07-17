import type { Texture, Sprite, Graphics, Container } from "Pixi.js";
import type Game from "../index";
import Vector from "../Vector";
import Entity from "./world/Entity/Entity";
import Model from "./world/Model/Model";

export default class Player {
  position: Vector;
  speed: number;
  friction: number;
  direction: Vector;
  texture: Texture;
  container: Container;
  sprite: Sprite;
  scalar: number;
  Game: Game;
  hitBox: Graphics;

  constructor(Game: Game) {
    this.position = new Vector([Game.canvas.offsetWidth / 2, Game.canvas.offsetHeight / 2]);
    this.speed = 20;
    this.friction = 0.9;
    this.direction = new Vector([0, 0]);
    this.scalar = Game.Renderer.view.width / 200;
    this.Game = Game;
    this.container = new Game.Pixi.Container();
    this.container.position.set(...this.position.value);

    this.texture = new Game.Pixi.Texture(
      Game.Assets.playerBaseTexture,
      new Game.Pixi.Rectangle(0, 0, 16, 16)
    );
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.scale.set(this.scalar, this.scalar);
    this.container.addChild(this.sprite);

    this.hitBox = new this.Game.Pixi.Graphics();
    this.hitBox.beginFill(0xff00b8);
    this.hitBox.drawRect(0, 0, this.sprite.width, this.sprite.height);
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

    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  move() {
    this.container.position.set(...this.position.value);
  }

  fire(direction: string) {
    console.log(direction);
  }
}

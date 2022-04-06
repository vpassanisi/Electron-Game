import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model/Model";
import type { AnimatedSprite, Sprite } from "pixi.js";
import Player from "renderer/lib/Player";

export default class Entity {
  speed: number;
  friction: number;
  scalar: number;
  direction: Vector;
  Game: Game;
  sprite: AnimatedSprite | null;
  hitBox: Sprite;
  id: number;

  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.speed = 10;
    this.friction = 0.9;
    this.scalar = 4;
    this.direction = new Vector([0, 0]);
    this.Game = Game;
    this.id = 0;

    this.sprite = new Game.Pixi.AnimatedSprite([]);
    this.sprite.scale.set(this.scalar, this.scalar);
    this.sprite.anchor.set(0.6, 0.7);
    this.sprite.position.set(
      (Game.canvas.offsetWidth / 15) * tileCoords.x,
      (Game.canvas.offsetHeight / 9) * tileCoords.y
    );

    this.hitBox = new this.Game.Pixi.Sprite(Game.Pixi.Texture.WHITE);
    this.hitBox.tint = 0xff00b8;
    this.hitBox.scale.set(this.scalar / 2.25, this.scalar / 2.75);
    this.hitBox.position.set(this.sprite.position.x, this.sprite.position.y);

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
      Math.floor(
        (this.hitBox.x + this.hitBox.width / 2) /
          (this.Game.canvas.offsetWidth / 15)
      ),
      Math.floor(
        (this.hitBox.y + this.hitBox.height / 2) /
          (this.Game.canvas.offsetHeight / 9)
      ),
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
    this.hitBox.position.set(
      this.hitBox.position.x,
      coord - this.hitBox.height
    );
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

  playerCollision(player: Player) {
    const left = Math.abs(this.rightSide - player.leftSide);
    const right = Math.abs(this.leftSide - player.rightSide);
    const top = Math.abs(this.bottomSide - player.topSide);
    const bottom = Math.abs(this.topSide - player.bottomSide);

    const smallest = Math.min(right, left, top, bottom);

    switch (true) {
      case right === smallest:
        this.direction.x = 0;
        this.setPositionOfLeft(player.rightSide);
        break;
      case left === smallest:
        this.direction.x = 0;
        this.setPositionOfRight(player.leftSide);
        break;
      case top === smallest:
        this.direction.y = 0;
        this.setPositionOfBottom(player.topSide);
        break;
      case bottom === smallest:
        this.direction.y = 0;
        this.setPositionOfTop(player.bottomSide);
        break;
    }
  }

  update(Game: Game) {
    const analog = new Vector([
      Game.Controller.Gamepad?.axes[0] ?? 0,
      Game.Controller.Gamepad?.axes[1] ?? 0,
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
    this.sprite?.position.set(this.hitBox.x, this.hitBox.y);
  }

  entityCollision(entity: Entity) {}

  remove() {}

  hit(damage: number) {}

  toggleHitBox() {
    this.hitBox.visible = !this.hitBox.visible;
  }
}

import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model/Model";
import type { Sprite, AnimatedSprite } from "pixi.js";
import type Entity from "renderer/lib/world/Entity/Entity";
import Player from "renderer/lib/Player";

export default class Bat implements Entity {
  speed: number;
  friction: number;
  scalar: number;
  direction: Vector;
  sprite: AnimatedSprite;
  Game: Game;
  hitBox: Sprite;
  id: number;
  hp: number;

  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.speed = 1.5;
    this.friction = 0.9;
    this.scalar = 4;
    this.direction = new Vector([0, 0]);
    this.Game = Game;
    this.id = Date.now();
    this.hp = 10;

    this.sprite = new Game.Pixi.AnimatedSprite(Game.Assets.batTextures);
    this.sprite.zIndex = Game.zIndex.bat;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.sprite.scale.set(this.scalar, this.scalar);
    this.sprite.anchor.set(0.35, 0.4);
    this.sprite.position.set(
      Game.canvas.offsetWidth * roomCoords.x +
        (Game.canvas.offsetWidth / 15) * tileCoords.x,
      Game.canvas.offsetHeight * roomCoords.y +
        (Game.canvas.offsetHeight / 9) * tileCoords.y
    );

    this.hitBox = new this.Game.Pixi.Sprite(Game.Pixi.Texture.WHITE);
    this.hitBox.tint = 0xff00b8;
    this.hitBox.scale.set(this.scalar / 2.8, this.scalar / 2.9);
    this.hitBox.position.set(this.sprite.position.x, this.sprite.position.y);
    this.hitBox.zIndex = Game.zIndex.bat;

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
        (this.hitBox.x +
          this.hitBox.width / 2 -
          this.Game.canvas.offsetWidth * this.Game.currentRoom.coords.x) /
          (this.Game.canvas.offsetWidth / 15)
      ),
      Math.floor(
        (this.hitBox.y +
          this.hitBox.height / 2 -
          this.Game.canvas.offsetHeight * this.Game.currentRoom.coords.y) /
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
    this.direction.add(
      new Vector([
        Game.Player.hitBox.position.x +
          Game.Player.hitBox.width / 2 -
          this.hitBox.position.x,
        Game.Player.hitBox.position.y +
          Game.Player.hitBox.height / 2 -
          this.hitBox.position.y,
      ]).scaleTo(0.01)
    );

    this.direction.multiply(this.friction);
    this.direction.clamp(this.speed);

    this.hitBox.position.set(
      this.hitBox.position.x + this.direction.x,
      this.hitBox.position.y + this.direction.y
    );
  }

  move() {
    this.sprite.position.set(this.hitBox.x, this.hitBox.y);
  }

  hit(damage: number) {
    this.hp -= damage;
    if (this.hp <= 0) this.remove();
  }

  entityCollision(entity: Entity) {}

  remove() {
    this.Game.Stage.removeChild(this.sprite);
    this.Game.Stage.removeChild(this.hitBox);
    this.Game.NonPlayerEntities.forEach((npe, i, arr) => {
      if (npe.id === this.id) arr.splice(i, 1);
    });
  }

  toggleHitBox() {
    this.hitBox.visible = !this.hitBox.visible;
  }
}

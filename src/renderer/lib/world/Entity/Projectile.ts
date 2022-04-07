import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model/Model";
import type { Sprite } from "pixi.js";
import type Entity from "renderer/lib/world/Entity/Entity";
import Player from "renderer/lib/Player";

export default class Projectile implements Entity {
  speed: number;
  friction: number;
  scalar: number;
  direction: Vector;
  sprite: null;
  Game: Game;
  hitBox: Sprite;
  id: number;

  constructor(Game: Game, position: Vector, direction: Vector) {
    this.Game = Game;
    this.speed = 1;
    this.friction = 1;
    this.scalar = 1;
    this.sprite = null;
    this.direction = direction;
    this.id = Game.Pixi.utils.uid();

    this.hitBox = new this.Game.Pixi.Sprite(Game.Pixi.Texture.WHITE);
    this.hitBox.scale.set(this.scalar);
    this.hitBox.position.set(...position.value);

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
    this.remove();
  }
  playerCollision(player: Player) {}

  entityCollision(entity: Entity) {
    this.remove();
    entity.hit(1);
  }

  update() {
    this.hitBox.position.set(
      this.hitBox.position.x + this.direction.x,
      this.hitBox.position.y + this.direction.y
    );
  }

  remove() {
    this.Game.Stage.removeChild(this.hitBox);
    this.Game.PlayerEntities = this.Game.PlayerEntities.filter(
      (pe) => pe.id !== this.id
    );
  }

  hit() {}

  move() {}

  toggleHitBox() {}
}

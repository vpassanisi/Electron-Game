import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import CircleHitbox from "renderer/lib/CircleHitbox";
import type Entity from "renderer/lib/world/Entity";
import Player from "renderer/lib/Player";
import type { Graphics } from "pixi.js";

export default class Projectile {
  speed: number;
  friction: number;
  scalar: number;
  direction: Vector;
  sprite: Graphics;
  Game: Game;
  hitBox: CircleHitbox;
  damage: number;
  id: number;

  constructor(Game: Game, position: Vector, direction: Vector) {
    this.Game = Game;
    this.speed = 1;
    this.friction = 1;
    this.scalar = 1;
    this.damage = 2;
    this.sprite = new Game.Pixi.Graphics();
    this.direction = direction;
    this.id = Game.Pixi.utils.uid();

    this.sprite.zIndex = this.Game.zIndex.player + 1;

    this.hitBox = new CircleHitbox(this.Game, position, 10);

    this.Game.Stage.addChild(this.sprite);
  }

  get currentTileCoords() {
    return new Vector([
      Math.floor(
        (this.hitBox.center.x -
          this.Game.canvas.offsetWidth * this.Game.currentRoom.coords.x) /
          (this.Game.canvas.offsetWidth / 15)
      ),
      Math.floor(
        (this.hitBox.center.y -
          this.Game.canvas.offsetHeight * this.Game.currentRoom.coords.y) /
          (this.Game.canvas.offsetHeight / 9)
      ),
    ]);
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
    this.hitBox.move(this.direction);

    this.sprite.clear();
    this.sprite.beginFill(0xff00b8);
    this.sprite.drawCircle(
      this.hitBox.center.x,
      this.hitBox.center.y,
      this.hitBox.radius
    );
    this.sprite.endFill();
  }

  remove() {
    this.hitBox.remove();
    this.Game.Stage.removeChild(this.sprite);
    this.Game.PlayerProjectiles.remove(this);
  }

  hit() {}

  move() {}

  toggleHitBox() {}
}

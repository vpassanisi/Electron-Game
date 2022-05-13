import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { AnimatedSprite } from "pixi.js";
import type Entity from "renderer/lib/world/Entity";
import Player from "renderer/lib/Player";
import PolygonHitbox from "renderer/lib/PolygonHitbox";

export default class Bat implements Entity {
  speed: number;
  friction: number;
  scalar: number;
  direction: Vector;
  sprite: AnimatedSprite;
  Game: Game;
  hitBox: PolygonHitbox;
  id: number;
  hp: number;

  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.speed = 1.5;
    this.friction = 0.9;
    this.scalar = 4;
    this.direction = new Vector([0, 0]);
    this.Game = Game;
    this.id = this.Game.Pixi.utils.uid();
    this.hp = 10;

    const p1 = new Vector([
      Game.canvas.offsetWidth * roomCoords.x +
        (Game.canvas.offsetWidth / 15) * tileCoords.x,
      Game.canvas.offsetHeight * roomCoords.y +
        (Game.canvas.offsetHeight / 9) * tileCoords.y,
    ]);
    this.hitBox = new PolygonHitbox(Game, {
      verts: [
        p1,
        new Vector([p1.x + 20, p1.y]),
        new Vector([p1.x + 20, p1.y + 20]),
        new Vector([p1.x, p1.y + 20]),
      ],
    });

    this.sprite = new Game.Pixi.AnimatedSprite(Game.Assets.batTextures);
    this.sprite.zIndex = Game.zIndex.bat;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.sprite.scale.set(this.scalar, this.scalar);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(this.hitBox.center.x, this.hitBox.center.y);

    Game.Stage.addChild(this.sprite);
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

  modelCollision(model: Model) {}

  playerCollision(player: Player) {}

  update() {
    const towardsPlayer = new Vector([
      this.Game.Player.hitBox.center.x - this.hitBox.center.x,
      this.Game.Player.hitBox.center.y - this.hitBox.center.y,
    ]).scaleTo(0.1);

    this.direction.add(towardsPlayer);

    this.direction.multiply(this.friction);
    this.direction.clamp(this.speed);

    this.hitBox.move(new Vector([this.direction.x, this.direction.y]));
  }

  move() {
    this.sprite.position.set(this.hitBox.center.x, this.hitBox.center.y);
  }

  hit(damage: number) {
    this.hp -= damage;
    if (this.hp <= 0) this.remove();
  }

  entityCollision(entity: Entity) {}

  remove() {
    this.Game.Stage.removeChild(this.sprite);
    this.Game.Stage.removeChild(this.hitBox.graphics);
    this.Game.NonPlayerEntities.remove(this);
  }
}

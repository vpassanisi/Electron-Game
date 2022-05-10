import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { AnimatedSprite } from "pixi.js";
import Player from "renderer/lib/Player";
import PolygonHitbox from "renderer/lib/PolygonHitbox";

export default class Entity {
  speed: number;
  friction: number;
  scalar: number;
  direction: Vector;
  Game: Game;
  sprite: AnimatedSprite | null;
  hitBox: PolygonHitbox;
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

    const p1 = new Vector();
    this.hitBox = new PolygonHitbox(Game, [p1, p1, p1, p1]);

    Game.Stage.addChild(this.sprite);
  }

  get currentTileCoords() {
    return new Vector([
      Math.floor(this.hitBox.center.x / (this.Game.canvas.offsetWidth / 15)),
      Math.floor(this.hitBox.center.y / (this.Game.canvas.offsetHeight / 9)),
    ]);
  }

  modelCollision(model: Model) {}

  playerCollision(player: Player) {}

  update() {
    const analog = new Vector([
      this.Game.Controller.Gamepad?.axes[0] ?? 0,
      this.Game.Controller.Gamepad?.axes[1] ?? 0,
    ]).multiply(this.speed * 0.1);

    this.direction.add(analog);

    // slow down the player smoothly
    this.direction.multiply(this.friction);

    this.direction.quantize();
    this.direction.clamp(this.speed);

    this.hitBox.move(
      new Vector([
        this.hitBox.center.x + this.direction.x,
        this.hitBox.center.y + this.direction.y,
      ])
    );
  }

  move() {
    this.sprite?.position.set(this.hitBox.center.x, this.hitBox.center.y);
  }

  entityCollision(entity: Entity) {}

  remove() {}

  hit(damage: number) {}
}

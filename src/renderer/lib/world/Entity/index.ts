import type Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { AnimatedSprite } from "Pixi.js";
import Player from "renderer/lib/world/Player";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import Room from "renderer/lib/world/Room";
import PathFinder from "renderer/util/PathFinder";

export default class Entity {
  speed: number;
  friction: number;
  scalar: number;
  direction: Vector;
  Game: Game;
  sprite: AnimatedSprite | null;
  hitBox: PolygonHitbox;
  id: number;
  contactDamage: number;
  room: Room;
  pathFinder: PathFinder;

  constructor(Game: Game, room: Room, tileCoords: Vector, roomCoords: Vector) {
    this.speed = 10;
    this.friction = 0.9;
    this.scalar = 4;
    this.direction = new Vector([0, 0]);
    this.Game = Game;
    this.room = room;
    this.id = 0;
    this.contactDamage = 1;

    this.sprite = new Game.Pixi.AnimatedSprite([]);

    const p1 = new Vector();
    this.hitBox = new PolygonHitbox({
      Game,
      hitboxDimentions: {
        center: p1,
        height: 50,
        width: 50,
      },
    });
    this.pathFinder = new PathFinder({ Game, mob: this });
  }

  get currentTileCoords() {
    return new Vector();
  }

  modelCollision(model: Model) {}

  playerCollision(player: Player) {}

  update() {}

  move() {}

  entityCollision(entity: Entity) {}

  die() {}

  hit(damage: number) {}

  delete() {}
}

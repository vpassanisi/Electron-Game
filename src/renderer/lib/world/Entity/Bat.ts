import type Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { AnimatedSprite } from "Pixi.js";
import type Entity from "renderer/lib/world/Entity";
import Player from "renderer/lib/world/Player";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import { Item } from "renderer/lib/world/Item";
import { dice, keys, pickRandomly } from "renderer/util/generalUtil";
import Room from "renderer/lib/world/Room";
import { ItemTypes } from "renderer/types";
import PathFinder from "renderer/util/PathFinder";

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
  contactDamage: number;
  drops: ItemTypes[];
  room: Room;
  pathFinder: PathFinder;

  constructor(Game: Game, room: Room, tileCoords: Vector) {
    this.speed = 1.5;
    this.friction = 0.9;
    this.scalar = 4;
    this.direction = new Vector([0, 0]);
    this.Game = Game;
    this.room = room;
    this.id = this.Game.Pixi.utils.uid();
    this.hp = 10;
    this.contactDamage = 1;
    this.drops = keys(this.Game.Assets["itemTextures"]);

    const position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x + Game.dimentions.tileWidth / 2,
      Game.dimentions.tileHeight * tileCoords.y + Game.dimentions.tileHeight / 2,
    ]);
    this.hitBox = new PolygonHitbox({
      Game,
      hitboxDimentions: {
        center: position,
        height: 20,
        width: 20,
      },
    });

    this.sprite = new Game.Pixi.AnimatedSprite(Game.Assets.animatedTextures.batTextures);
    this.sprite.zIndex = Game.zIndex.bat;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.sprite.scale.set(this.scalar, this.scalar);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(this.hitBox.center.x, this.hitBox.center.y);

    room.container.addChild(this.sprite);

    this.pathFinder = new PathFinder({ Game, mob: this });
  }

  get currentTileCoords() {
    return new Vector([
      Math.floor(this.hitBox.center.x / this.Game.dimentions.tileWidth),
      Math.floor(this.hitBox.center.y / this.Game.dimentions.tileHeight),
    ]);
  }

  modelCollision(model: Model) {}

  playerCollision(player: Player) {}

  update() {
    this.pathFinder.update();
    if (!this.pathFinder.hasLineOfSight()) return;
    this.pathFinder.pathFind();

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
    if (this.hp <= 0) this.die();
  }

  entityCollision(entity: Entity) {}

  spawnItem() {
    const item = pickRandomly(this.drops);
    new Item({ Game: this.Game }).drop(this.room, this.hitBox.center);
  }

  die() {
    this.room.container.removeChild(this.sprite);
    if (dice(0.99)) this.spawnItem();
    this.Game.NonPlayerEntities.remove(this);
  }

  delete() {
    this.room.container.removeChild(this.sprite);
    this.Game.NonPlayerEntities.remove(this);
  }
}

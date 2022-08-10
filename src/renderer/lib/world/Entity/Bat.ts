import type Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model";
import type { AnimatedSprite } from "pixi.js";
import type Entity from "renderer/lib/world/Entity";
import Player from "renderer/lib/Player";
import PolygonHitbox from "renderer/lib/PolygonHitbox";
import { Helmet, Item, Boots, Chest, Gloves } from "renderer/lib/world/Item";
import { dice, pickRandomly } from "renderer/util/generalUtil";

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
  drops: typeof Item[];

  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.speed = 1.5;
    this.friction = 0.9;
    this.scalar = 4;
    this.direction = new Vector([0, 0]);
    this.Game = Game;
    this.id = this.Game.Pixi.utils.uid();
    this.hp = 10;
    this.contactDamage = 1;
    this.drops = [Helmet, Chest, Gloves, Boots];

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
          this.Game.dimentions.canvasWidth * this.Game.currentRoom.coords.x) /
          this.Game.dimentions.tileWidth
      ),
      Math.floor(
        (this.hitBox.center.y -
          this.Game.dimentions.canvasHeight * this.Game.currentRoom.coords.y) /
          this.Game.dimentions.tileHeight
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
    if (this.hp <= 0) this.die();
  }

  entityCollision(entity: Entity) {}

  spawnItem() {
    const { tileWidth, tileHeight, canvasWidth, canvasHeight } =
      this.Game.dimentions;
    const x =
      canvasWidth * this.Game.currentRoom.coords.x +
      tileWidth * this.currentTileCoords.x +
      tileWidth / 2;
    const y =
      canvasHeight * this.Game.currentRoom.coords.y +
      tileHeight * this.currentTileCoords.y +
      tileHeight / 2;
    const drop = pickRandomly(this.drops);
    this.Game.FloorItems.add(new drop(this.Game, new Vector([x, y])));
  }

  die() {
    this.Game.Stage.removeChild(this.sprite);
    this.Game.Stage.removeChild(this.hitBox.graphics);
    if (dice(0.99)) {
      this.spawnItem();
    }
    this.Game.NonPlayerEntities.remove(this);
  }
}

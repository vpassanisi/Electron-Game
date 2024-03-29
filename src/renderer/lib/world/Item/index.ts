import type { Texture, Graphics } from "pixi.js";
import type Game from "renderer";
import { getPrefixMod, PrefixMod } from "renderer/lib/world/Item/PrefixMods";
import { SuffixMod, getSuffixMod } from "renderer/lib/world/Item/SuffixMods";
import Vector from "renderer/vector";
import CircleHitbox from "renderer/lib/CircleHitbox";
import Room from "renderer/lib/world/Room";

export class Item {
  Game: Game;
  prefixMod1: PrefixMod;
  suffixMod1: SuffixMod;
  texture: Texture;
  sprite: Graphics;
  hitbox: CircleHitbox;
  id: number;
  room: Room;

  constructor(Game: Game, room: Room, position: Vector) {
    this.Game = Game;
    this.room = room;
    this.id = Game.Pixi.utils.uid();
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();
    this.texture = Game.Assets.bootsTexture;
    this.sprite = new Game.Pixi.Graphics();
    this.hitbox = new CircleHitbox(Game, room.container, new Vector([position.x, position.y]), 10);
  }

  pickup() {}

  delete() {}
}

export class Helmet implements Item {
  Game: Game;
  prefixMod1: PrefixMod;
  suffixMod1: SuffixMod;
  texture: Texture;
  sprite: Graphics;
  hitbox: CircleHitbox;
  id: number;
  room: Room;

  constructor(Game: Game, room: Room, position: Vector) {
    this.Game = Game;
    this.room = room;
    this.id = Game.Pixi.utils.uid();
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();

    this.texture = Game.Assets.helmetTexture;

    this.hitbox = new CircleHitbox(Game, room.container, position, 10);

    this.sprite = new Game.Pixi.Graphics();
    this.sprite.beginFill(0xffae00);
    this.sprite.drawCircle(this.hitbox.center.x, this.hitbox.center.y, this.hitbox.radius);
    this.sprite.endFill();

    room.container.addChild(this.sprite);
  }

  pickup() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
  }

  delete() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
    this.room.floorItems.remove(this);
  }
}

export class Chest implements Item {
  Game: Game;
  prefixMod1: PrefixMod;
  suffixMod1: SuffixMod;
  texture: Texture;
  sprite: Graphics;
  hitbox: CircleHitbox;
  id: number;
  room: Room;

  constructor(Game: Game, room: Room, position: Vector) {
    this.Game = Game;
    this.room = room;
    this.id = Game.Pixi.utils.uid();
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();

    this.texture = Game.Assets.chestTexture;

    this.hitbox = new CircleHitbox(Game, room.container, position, 10);

    this.sprite = new Game.Pixi.Graphics();
    this.sprite.beginFill(0xffae00);
    this.sprite.drawCircle(this.hitbox.center.x, this.hitbox.center.y, this.hitbox.radius);
    this.sprite.endFill();

    room.container.addChild(this.sprite);
  }

  pickup() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
  }

  delete() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
    this.room.floorItems.remove(this);
  }
}

export class Gloves implements Item {
  Game: Game;
  prefixMod1: PrefixMod;
  suffixMod1: SuffixMod;
  texture: Texture;
  sprite: Graphics;
  hitbox: CircleHitbox;
  id: number;
  room: Room;

  constructor(Game: Game, room: Room, position: Vector) {
    this.Game = Game;
    this.room = room;
    this.id = Game.Pixi.utils.uid();
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();

    this.texture = Game.Assets.glovesTexture;

    this.hitbox = new CircleHitbox(Game, room.container, position, 10);

    this.sprite = new Game.Pixi.Graphics();
    this.sprite.beginFill(0xffae00);
    this.sprite.drawCircle(this.hitbox.center.x, this.hitbox.center.y, this.hitbox.radius);
    this.sprite.endFill();

    room.container.addChild(this.sprite);
  }

  pickup() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
  }

  delete() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
    this.room.floorItems.remove(this);
  }
}

export class Boots implements Item {
  Game: Game;
  prefixMod1: PrefixMod;
  suffixMod1: SuffixMod;
  texture: Texture;
  sprite: Graphics;
  hitbox: CircleHitbox;
  id: number;
  room: Room;

  constructor(Game: Game, room: Room, position: Vector) {
    this.Game = Game;
    this.room = room;
    this.id = Game.Pixi.utils.uid();
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();

    this.texture = Game.Assets.bootsTexture;

    this.hitbox = new CircleHitbox(Game, room.container, position, 10);

    this.sprite = new Game.Pixi.Graphics();
    this.sprite.beginFill(0xffae00);
    this.sprite.drawCircle(this.hitbox.center.x, this.hitbox.center.y, this.hitbox.radius);
    this.sprite.endFill();

    room.container.addChild(this.sprite);
  }

  pickup() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
  }

  delete() {
    this.room.container.removeChild(this.sprite);
    this.hitbox.parent.removeChild(this.hitbox.graphics);
    this.room.floorItems.remove(this);
  }
}

import { Texture, Sprite } from "Pixi.js";
import type Game from "renderer";
import { getPrefixMod, PrefixMod } from "renderer/lib/world/Item/PrefixMods";
import { SuffixMod, getSuffixMod } from "renderer/lib/world/Item/SuffixMods";
import Vector from "renderer/vector";
import CircleHitbox from "renderer/lib/CircleHitbox";
import Room from "renderer/lib/world/Room";

export class Item {
  Game: Game;
  prefixMod1: PrefixMod | null;
  suffixMod1: SuffixMod | null;
  texture: Texture;
  sprite: Sprite;
  hitbox: CircleHitbox;
  id: number;
  room: Room;

  constructor(Game: Game, room: Room, position: Vector) {
    this.Game = Game;
    this.room = room;
    this.id = Game.Pixi.utils.uid();
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();

    this.texture = Texture.WHITE;

    this.hitbox = new CircleHitbox(Game, room.container, position, 10);

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(position.x, position.y);
    room.container.addChild(this.sprite);

    this.sprite.eventMode = "static";

    this.sprite.on("mouseenter", this.handleMouseEnter);
    this.sprite.on("mouseleave", this.handleMouseLeave);
    this.sprite.on("click", this.handleClick);
  }

  handleClick = () => {
    this.Game.GrabbedItem.item = this;
    this.pickup();
    this.Game.floorMap.currentRoom?.floorItems.remove(this);
    this.Game.MouseOverInfo.item = null;
  };

  handleMouseEnter = () => {
    this.Game.MouseOverInfo.item = this;
  };

  handleMouseLeave = () => {
    this.Game.MouseOverInfo.item = null;
  };

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

export class Helmet extends Item {
  texture: Texture;

  constructor(Game: Game, room: Room, position: Vector) {
    super(Game, room, position);
    this.texture = Game.Assets.helmetTexture;
    this.sprite.texture = this.texture;
  }
}

export class Chest extends Item {
  texture: Texture;

  constructor(Game: Game, room: Room, position: Vector) {
    super(Game, room, position);
    this.texture = Game.Assets.chestTexture;
    this.sprite.texture = this.texture;
  }
}

export class Gloves extends Item {
  texture: Texture;

  constructor(Game: Game, room: Room, position: Vector) {
    super(Game, room, position);
    this.texture = Game.Assets.glovesTexture;
    this.sprite.texture = this.texture;
  }
}

export class Boots extends Item {
  texture: Texture;

  constructor(Game: Game, room: Room, position: Vector) {
    super(Game, room, position);
    this.texture = Game.Assets.bootsTexture;
    this.sprite.texture = this.texture;
  }
}

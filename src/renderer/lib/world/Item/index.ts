import { Texture, Sprite } from "Pixi.js";
import type Game from "renderer";
import { getPrefixMod, PrefixMod } from "renderer/lib/world/Item/PrefixMods";
import { SuffixMod, getSuffixMod } from "renderer/lib/world/Item/SuffixMods";
import Vector from "renderer/vector";
import Room from "renderer/lib/world/Room";
import { pickRandomly, keys } from "renderer/util/generalUtil";
import { ItemSaveData, ItemTypes } from "renderer/types";

interface args {
  Game: Game;
  data?: ItemSaveData;
}

export class Item {
  Game: Game;
  prefixMod1: PrefixMod | null;
  suffixMod1: SuffixMod | null;
  texture: Texture;
  sprite: Sprite;
  id: number;
  room: Room | null;
  itemType: ItemTypes;

  constructor({ Game, data }: args) {
    this.Game = Game;

    data = data ?? {
      itemType: pickRandomly(keys(this.Game.Assets.itemTextures)),
      prefixMod1: getPrefixMod(),
      suffixMod1: getSuffixMod(),
    };

    this.room = null;
    this.id = Game.Pixi.utils.uid();
    this.prefixMod1 = data.prefixMod1;
    this.suffixMod1 = data.suffixMod1;
    this.itemType = data.itemType;

    this.texture = this.Game.Assets.itemTextures[data.itemType];

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.height = this.Game.dimentions.tileHeight / 2;
    this.sprite.width = this.Game.dimentions.tileWidth / 2;
    this.sprite.eventMode = "static";

    this.sprite.on("mouseenter", this.handleMouseEnter);
    this.sprite.on("mouseleave", this.handleMouseLeave);
    this.sprite.on("click", this.handleClick);
  }

  get saveData(): ItemSaveData {
    return {
      itemType: this.itemType,
      prefixMod1: this.prefixMod1,
      suffixMod1: this.suffixMod1,
    };
  }

  handleClick = () => {
    this.Game.GrabbedItem.item = this;
    this.pickup();
    this.Game.FloorMap.currentRoom?.floorItems.remove(this);
    this.Game.MouseOverInfo.item = null;
  };

  handleMouseEnter = () => {
    this.Game.MouseOverInfo.item = this;
  };

  handleMouseLeave = () => {
    this.Game.MouseOverInfo.item = null;
  };

  drop(room: Room, position: Vector) {
    this.room = room;
    this.sprite.position.set(position.x, position.y);
    this.room.container.addChild(this.sprite);
    this.room.floorItems.add(this);
  }

  pickup() {
    this.room?.container.removeChild(this.sprite);
    this.room?.floorItems.remove(this);
  }

  delete() {
    this.room?.container.removeChild(this.sprite);
    this.room?.floorItems.remove(this);
  }
}

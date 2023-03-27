import Game from "renderer";
import { List } from "@pixi/ui";
import { Container, Sprite, Texture } from "Pixi.js";
import InventorySlot from "renderer/lib/world/UI/InventorySlot";
import { Item } from "renderer/lib/world/Item";
import { ItemSaveData } from "renderer/types";

export default class Inventory {
  Game: Game;
  list: List;
  slots: InventorySlot[];
  container: Container;
  containerBG: Sprite;

  constructor(Game: Game) {
    this.Game = Game;

    const elementsMargin = 1;
    const horPadding = 5;
    const vertPadding = 5;
    const columns = 3;
    const rows = 2;

    this.container = new Container();
    this.container.visible = false;
    this.container.zIndex = 1;

    this.containerBG = new Sprite(Texture.WHITE);
    this.containerBG.tint = 0x383838;
    this.containerBG.width =
      this.Game.dimentions.tileWidth * columns +
      elementsMargin * (columns - 1) +
      horPadding * 2 +
      1;
    this.containerBG.height =
      this.Game.dimentions.tileHeight * rows +
      elementsMargin +
      elementsMargin * (rows - 1) +
      vertPadding * 2;
    this.container.addChild(this.containerBG);

    this.container.x =
      this.Game.dimentions.canvasWidth - this.container.width - this.Game.dimentions.tileWidth / 2;
    this.container.y =
      this.Game.dimentions.tileHeight / 2 +
      this.Game.dimentions.tileHeight * 4 +
      elementsMargin +
      elementsMargin * (rows - 1) +
      vertPadding * 2;

    this.slots = [];
    for (let i = 0; i < rows * columns; i++) {
      this.slots.push(new InventorySlot({ Game }));
    }

    this.list = new List({
      elementsMargin,
      horPadding,
      vertPadding,
    });

    this.container.addChild(this.list);

    this.slots.forEach((slot) => this.list.addChild(slot.container));

    this.container.eventMode = "static";

    this.Game.World.addChild(this.container);
  }

  get saveData() {
    return this.slots.map((slot) => slot.item?.saveData ?? null);
  }

  loadSaveData(data: (ItemSaveData | null)[]) {
    this.slots.forEach((slot, i) => {
      const itemData = data[i];
      slot.item = itemData ? new Item({ Game: this.Game, data: itemData }) : null;
    });
  }

  toggleInventory() {
    this.container.visible = !this.container.visible;
  }

  putItemInInventory(item: Item) {
    for (const slot of this.slots) {
      if (!slot.item) {
        slot.item = item;
        break;
      }
    }
  }
}
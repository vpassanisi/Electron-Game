import type Game from "renderer";
import { Boots, Chest, Gloves, Helmet, Item } from "renderer/lib/world/Item";

export default class PlayerInventory {
  Game: Game;
  equiped: {
    helmet: Helmet | null;
    chest: Chest | null;
    gloves: Gloves | null;
    boots: Boots | null;
  };
  constructor(Game: Game) {
    this.Game = Game;
    this.equiped = {
      helmet: null,
      chest: null,
      gloves: null,
      boots: null,
    };
  }

  get equipedList() {
    return Object.entries(this.equiped).reduce((prev, entry) => {
      if (entry[1]) return [...prev, entry[1]];
      else return prev;
    }, [] as Item[]);
  }

  equip(item: Item) {
    switch (true) {
      case item instanceof Helmet:
        this.equiped.helmet = item;
        break;
      case item instanceof Chest:
        this.equiped.chest = item;
        break;
      case item instanceof Gloves:
        this.equiped.gloves = item;
        break;
      case item instanceof Boots:
        this.equiped.boots = item;
        break;
      default:
        break;
    }
  }
}

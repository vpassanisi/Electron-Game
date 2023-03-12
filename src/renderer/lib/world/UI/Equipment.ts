import type Game from "renderer";
import { Boots, Chest, Gloves, Helmet, Item } from "renderer/lib/world/Item";
import {
  HelmetInventorySlot,
  ChestInventorySlot,
  GlovesInventorySlot,
  BootsInventorySlot,
} from "renderer/lib/world/UI/InventorySlot";

export default class Equipment extends HTMLElement {
  Game: Game;
  helmetSlot: HelmetInventorySlot;
  chestSlot: ChestInventorySlot;
  glovesSlot: GlovesInventorySlot;
  bootsSlot: BootsInventorySlot;

  constructor(Game: Game) {
    super();
    this.Game = Game;

    this.helmetSlot = new HelmetInventorySlot(Game);
    this.appendChild(this.helmetSlot);

    this.chestSlot = new ChestInventorySlot(Game);
    this.appendChild(this.chestSlot);

    this.glovesSlot = new GlovesInventorySlot(Game);
    this.appendChild(this.glovesSlot);

    this.bootsSlot = new BootsInventorySlot(Game);
    this.appendChild(this.bootsSlot);

    this.style.display = "grid";
    this.style.gridTemplateColumns = "repeat(3, 1fr)";
    this.style.gridTemplateRows = "repeat(3, 1fr)";

    this.helmetSlot.style.gridArea = "1 / 2 / 2 / 3";
    this.chestSlot.style.gridArea = "2 / 2 / 3 / 3";
    this.glovesSlot.style.gridArea = "3 / 1 / 4 / 2";
    this.bootsSlot.style.gridArea = "3 / 3 / 4 / 4";
  }

  get equiped() {
    return {
      helmet: this.helmetSlot.item,
      chest: this.chestSlot.item,
      gloves: this.glovesSlot.item,
      boots: this.bootsSlot.item,
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

customElements.define("player-equipment", Equipment);

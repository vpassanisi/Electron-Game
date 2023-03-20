import Game from "renderer";
import { Boots, Chest, Gloves, Helmet, Item } from "renderer/lib/world/Item";

export default class InventorySlot extends HTMLElement {
  Game: Game;
  uid: number;
  item: Item | null;
  icon: HTMLImageElement;

  constructor(Game: Game) {
    super();
    this.Game = Game;
    this.uid = Game.Pixi.utils.uid();
    this.item = null;

    this.style.height = `${this.Game.dimentions.tileHeight}px`;
    this.style.width = `${this.Game.dimentions.tileWidth}px`;
    this.style.backgroundColor = "#1c1c1c";
    this.style.margin = "5px";

    this.icon = this.appendChild(document.createElement("img"));
    this.icon.style.imageRendering = "pixelated";
    this.icon.classList.add("h-full", "w-full");
    this.icon.src = "";
  }

  setItem(item: Item): boolean {
    this.item = item;
    this.icon.src = item.texture.baseTexture.cacheId;
    return true;
  }

  clearItem() {
    this.item = null;
    this.icon.src = "";
  }

  update() {
    if (this.Game.UI.Inventory.grabbedSlot?.uid === this.uid) {
      this.style.border = "solid 1px gold";
    } else if (this.Game.UI.Inventory.selectedSlot?.uid === this.uid) {
      this.style.border = "solid 1px white";
    } else {
      this.style.border = "solid 1px black";
    }
  }
}

customElements.define("inventory-slot", InventorySlot);

export class HelmetInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  setItem(item: Item) {
    if (item instanceof Helmet) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
      return true;
    } else return false;
  }
}
customElements.define("helment-inventory-slot", HelmetInventorySlot);

export class ChestInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  setItem(item: Item) {
    if (item instanceof Chest) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
      return true;
    } else return false;
  }
}
customElements.define("chest-inventory-slot", ChestInventorySlot);

export class GlovesInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  setItem(item: Item) {
    if (item instanceof Gloves) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
      return true;
    } else return false;
  }
}
customElements.define("gloves-inventory-slot", GlovesInventorySlot);

export class BootsInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  setItem(item: Item): boolean {
    if (item instanceof Boots) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
      return true;
    } else return false;
  }
}
customElements.define("boots-inventory-slot", BootsInventorySlot);

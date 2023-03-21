import Game from "renderer";
import InventorySlot from "renderer/lib/world/UI/InventorySlot";
import type { Item } from "renderer/lib/world/Item";
import ItemInfo from "renderer/lib/world/UI/ItemInfo";
import Equipment from "renderer/lib/world/UI/Equipment";

export default class Inventory extends HTMLElement {
  Game: Game;
  inventoryDiv: HTMLDivElement;
  slots: Record<number, InventorySlot>;
  selectedItemInfo: ItemInfo;
  Equipment: Equipment;
  mouseImg: HTMLImageElement;
  private _grabbedItem: Item | null;

  constructor(Game: Game) {
    super();
    this.Game = Game;
    this._grabbedItem = null;
    this.selectedItemInfo = new ItemInfo(Game);
    this.selectedItemInfo.style.bottom = "";
    this.selectedItemInfo.style.top = "0px";
    this.selectedItemInfo.style.right = "188px";
    this.appendChild(this.selectedItemInfo);

    this.mouseImg = document.body.appendChild(document.createElement("img"));
    this.mouseImg.style.height = `${this.Game.dimentions.tileHeight}px`;
    this.mouseImg.style.width = `${this.Game.dimentions.tileWidth}px`;
    this.mouseImg.classList.add("absolute");
    this.mouseImg.src = "";
    this.mouseImg.style.imageRendering = "pixelated";
    document.addEventListener("mousemove", (e) => {
      this.mouseImg.style.left = `${e.clientX + 2}px`;
      this.mouseImg.style.top = `${e.clientY + 2}px`;
    });

    this.Equipment = new Equipment(Game);
    this.appendChild(this.Equipment);

    this.inventoryDiv = this.appendChild(document.createElement("div"));
    this.inventoryDiv.style.display = "grid";
    this.inventoryDiv.style.gridTemplateColumns = "repeat(3, 1fr)";

    const slots = [
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
    ];

    this.slots = {};
    slots.forEach((slot) => (this.slots[slot.uid] = slot));

    Object.entries(this.slots).forEach(([key, slot]) => {
      this.inventoryDiv.appendChild(slot);
    });

    this.style.position = "absolute";
    this.style.top = "10px";
    this.style.right = "10px";
    this.style.backgroundColor = "#000000C8";
    this.style.zIndex = "10";
    this.style.visibility = "hidden";
  }

  set grabbedItem(item: Item | null) {
    this._grabbedItem = item;
    if (item) this.mouseImg.src = item.texture.baseTexture.cacheId;
    else this.mouseImg.src = "";
  }

  get grabbedItem() {
    return this._grabbedItem;
  }

  toggleInventory() {
    if (this.style.visibility === "hidden") {
      this.style.visibility = "visible";
      this.Game.state.paused = true;
    } else {
      this.style.visibility = "hidden";
      this.selectedItemInfo.setCurrentItem(null);
      this.Game.state.paused = false;
    }
  }

  update() {
    const { justPressed } = this.Game.Controller;

    if (justPressed.tab) this.toggleInventory();
  }

  putItemInInventory(item: Item) {
    for (const [_, slot] of Object.entries(this.slots)) {
      if (!slot.item) {
        slot.setItem(item);
        break;
      }
    }
  }

  grabSelection(item: Item) {
    if (this.style.visibility === "hidden") return;
    this.grabbedItem = item;
  }
}

customElements.define("player-inventory", Inventory);

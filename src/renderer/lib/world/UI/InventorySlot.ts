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
    this.classList.add("border", "border-black", "hover:border-white");

    this.icon = this.appendChild(document.createElement("img"));
    this.icon.style.imageRendering = "pixelated";
    this.icon.classList.add("h-full", "w-full");
    this.icon.src = "";

    this.handleClick();
    this.handleMouseover();
    this.handleMouseleave();
  }

  handleClick() {
    const clickHandler = () => {
      console.log("fire");
      const { grabbedItem } = this.Game.UI.Inventory;
      this.Game.UI.Inventory.grabbedItem = this.item;
      this.item = grabbedItem;

      if (this.item) this.icon.src = this.item.texture.baseTexture.cacheId;
      else this.icon.src = "";

      this.Game.UI.Inventory.selectedItemInfo.setCurrentItem(this.item, true);
    };
    this.addEventListener("click", clickHandler);
  }

  handleMouseover() {
    const mouseOverHandler = () => {
      this.Game.UI.Inventory.selectedItemInfo.setCurrentItem(this.item);
    };
    this.addEventListener("mouseover", mouseOverHandler);
  }

  handleMouseleave() {
    const mouseLeaveHandler = () => {
      this.Game.UI.Inventory.selectedItemInfo.setCurrentItem(null);
    };
    this.addEventListener("mouseleave", mouseLeaveHandler);
  }

  setItem(item: Item) {
    this.item = item;
    this.icon.src = item.texture.baseTexture.cacheId;
  }

  clearItem() {
    this.item = null;
    this.icon.src = "";
  }

  update() {}
}

customElements.define("inventory-slot", InventorySlot);

export class HelmetInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  handleClick() {
    const clickHandler = () => {
      const { grabbedItem } = this.Game.UI.Inventory;
      if (grabbedItem instanceof Helmet || grabbedItem === null) {
        this.Game.UI.Inventory.grabbedItem = this.item;
        this.item = grabbedItem;

        if (this.item) this.icon.src = this.item.texture.baseTexture.cacheId;
        else this.icon.src = "";

        this.Game.UI.Inventory.selectedItemInfo.setCurrentItem(this.item);
      }
    };
    this.addEventListener("click", clickHandler);
  }

  setItem(item: Item) {
    if (item instanceof Helmet) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
    }
  }
}
customElements.define("helment-inventory-slot", HelmetInventorySlot);

export class ChestInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  handleClick() {
    const clickHandler = () => {
      const { grabbedItem } = this.Game.UI.Inventory;
      if (grabbedItem instanceof Chest || grabbedItem === null) {
        this.Game.UI.Inventory.grabbedItem = this.item;
        this.item = grabbedItem;

        if (this.item) this.icon.src = this.item.texture.baseTexture.cacheId;
        else this.icon.src = "";

        this.Game.UI.Inventory.selectedItemInfo.setCurrentItem(this.item);
      }
    };
    this.addEventListener("click", clickHandler);
  }

  setItem(item: Item) {
    if (item instanceof Chest) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
    }
  }
}
customElements.define("chest-inventory-slot", ChestInventorySlot);

export class GlovesInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  handleClick() {
    const clickHandler = () => {
      const { grabbedItem } = this.Game.UI.Inventory;
      if (grabbedItem instanceof Gloves || grabbedItem === null) {
        this.Game.UI.Inventory.grabbedItem = this.item;
        this.item = grabbedItem;

        if (this.item) this.icon.src = this.item.texture.baseTexture.cacheId;
        else this.icon.src = "";

        this.Game.UI.Inventory.selectedItemInfo.setCurrentItem(this.item);
      }
    };
    this.addEventListener("click", clickHandler);
  }

  setItem(item: Item) {
    if (item instanceof Gloves) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
    }
  }
}
customElements.define("gloves-inventory-slot", GlovesInventorySlot);

export class BootsInventorySlot extends InventorySlot {
  constructor(Game: Game) {
    super(Game);
  }

  handleClick() {
    const clickHandler = () => {
      const { grabbedItem } = this.Game.UI.Inventory;
      if (grabbedItem instanceof Boots || grabbedItem === null) {
        this.Game.UI.Inventory.grabbedItem = this.item;
        this.item = grabbedItem;

        if (this.item) this.icon.src = this.item.texture.baseTexture.cacheId;
        else this.icon.src = "";

        this.Game.UI.Inventory.selectedItemInfo.setCurrentItem(this.item);
      }
    };
    this.addEventListener("click", clickHandler);
  }

  setItem(item: Item) {
    if (item instanceof Boots) {
      this.item = item;
      this.icon.src = item.texture.baseTexture.cacheId;
    }
  }
}
customElements.define("boots-inventory-slot", BootsInventorySlot);

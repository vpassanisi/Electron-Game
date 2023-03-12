import Game from "renderer";
import { Boots, Chest, Gloves, Helmet, Item } from "renderer/lib/world/Item";

export default class InventorySlot extends HTMLElement {
  Game: Game;
  uid: number;
  item: Item | null;
  iconCanvas: HTMLCanvasElement;
  iconCanvasContext: CanvasRenderingContext2D;
  iconCanvasHeight: number;
  iconCanvasWidth: number;
  iconImg: HTMLImageElement;

  constructor(Game: Game) {
    super();
    this.Game = Game;
    this.uid = Game.Pixi.utils.uid();
    this.item = null;
    this.iconImg = new Image();
    this.iconCanvasHeight = 16;
    this.iconCanvasWidth = 16;

    this.style.height = `${this.Game.dimentions.tileHeight}px`;
    this.style.width = `${this.Game.dimentions.tileWidth}px`;
    this.style.backgroundColor = "#1c1c1c";
    this.style.margin = "5px";

    this.iconCanvas = this.appendChild(document.createElement("canvas"));
    this.iconCanvas.height = this.iconCanvasHeight;
    this.iconCanvas.width = this.iconCanvasWidth;
    this.iconCanvas.style.height = this.style.height;
    this.iconCanvas.style.width = this.style.width;
    this.iconCanvas.style.imageRendering = "pixelated";

    this.iconCanvasContext = this.iconCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
  }

  setItem(item: Item): boolean {
    this.item = item;
    this.iconCanvasContext.clearRect(0, 0, 16, 16);
    const { height, width, top, left } = item.texture.frame;
    this.iconImg.src = item.texture.baseTexture.cacheId;
    this.iconImg.onload = () => {
      this.iconCanvasContext.drawImage(
        this.iconImg,
        left,
        top,
        width,
        height,
        0,
        0,
        this.iconCanvasWidth,
        this.iconCanvasHeight
      );
    };
    return true;
  }

  clearItem() {
    this.item = null;
    this.iconCanvasContext.clearRect(0, 0, 16, 16);
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
      const { height, width, top, left } = item.texture.frame;
      this.iconImg.src = item.texture.baseTexture.cacheId;
      this.iconImg.onload = () => {
        this.iconCanvasContext.drawImage(
          this.iconImg,
          left,
          top,
          width,
          height,
          0,
          0,
          this.iconCanvasWidth,
          this.iconCanvasHeight
        );
      };
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
      const { height, width, top, left } = item.texture.frame;
      this.iconImg.src = item.texture.baseTexture.cacheId;
      this.iconImg.onload = () => {
        this.iconCanvasContext.drawImage(
          this.iconImg,
          left,
          top,
          width,
          height,
          0,
          0,
          this.iconCanvasWidth,
          this.iconCanvasHeight
        );
      };
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
      const { height, width, top, left } = item.texture.frame;
      this.iconImg.src = item.texture.baseTexture.cacheId;
      this.iconImg.onload = () => {
        this.iconCanvasContext.drawImage(
          this.iconImg,
          left,
          top,
          width,
          height,
          0,
          0,
          this.iconCanvasWidth,
          this.iconCanvasHeight
        );
      };
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
      const { height, width, top, left } = item.texture.frame;
      this.iconImg.src = item.texture.baseTexture.cacheId;
      this.iconImg.onload = () => {
        this.iconCanvasContext.drawImage(
          this.iconImg,
          left,
          top,
          width,
          height,
          0,
          0,
          this.iconCanvasWidth,
          this.iconCanvasHeight
        );
      };
      return true;
    } else return false;
  }
}
customElements.define("boots-inventory-slot", BootsInventorySlot);

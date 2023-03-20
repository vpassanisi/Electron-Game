import Game from "renderer";
import { Item } from "renderer/lib/world/Item";

export default class ItemInfo extends HTMLElement {
  Game: Game;
  icon: HTMLImageElement;
  prefix1: HTMLDivElement;
  suffix1: HTMLDivElement;
  line: HTMLDivElement;
  currentItem: Item | null;

  constructor(Game: Game) {
    super();
    this.Game = Game;
    this.currentItem = null;

    this.style.position = "absolute";
    this.style.bottom = "10px";
    this.style.right = "10px";
    this.style.width = `${this.Game.dimentions.canvasWidth / 4}px`;
    this.style.backgroundColor = "#000000C8";
    this.style.display = "flex";
    this.style.alignItems = "center";
    this.style.flexDirection = "column";
    this.style.paddingTop = "5px";
    this.style.paddingBottom = "5px";
    this.style.visibility = "hidden";

    this.icon = this.appendChild(document.createElement("img"));
    this.icon.style.height = "50px";
    this.icon.style.width = "50px";
    this.icon.style.imageRendering = "pixelated";

    this.line = this.appendChild(document.createElement("div"));
    this.line.style.width = "60%";
    this.line.style.borderTop = "white solid 1px";
    this.line.style.marginTop = "5px";

    this.prefix1 = this.appendChild(document.createElement("div"));
    this.prefix1.style.color = "white";
    this.prefix1.style.width = "100%";
    this.prefix1.style.textAlign = "center";
    this.prefix1.style.marginTop = "5px";

    this.suffix1 = this.appendChild(document.createElement("div"));
    this.suffix1.style.color = "white";
    this.suffix1.style.widows = "100%";
    this.suffix1.style.textAlign = "center";
    this.suffix1.style.marginTop = "5px";
  }

  setCurrentItem(item: Item | null | undefined, overwrite?: boolean) {
    if (item && overwrite) return this.setElement(item);
    if (item && !this.currentItem) this.setElement(item);
    else if (!item && this.currentItem) this.clearElement();
  }

  private setElement(item: Item) {
    this.currentItem = item;
    this.style.visibility = "visible";

    this.icon.src = item.texture.baseTexture.cacheId;

    this.prefix1.innerText = item.prefixMod1.text;
    this.suffix1.innerText = item.suffixMod1.text;
  }

  private clearElement() {
    this.currentItem = null;
    this.style.visibility = "hidden";
    this.icon.src = "";
    this.prefix1.innerText = "";
    this.suffix1.innerText = "";
  }

  update() {}

  connectedCallback() {
    console.log("connected");
  }
}

customElements.define("item-info", ItemInfo);

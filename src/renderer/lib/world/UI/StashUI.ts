import Game from "renderer";
import InventorySlot from "renderer/lib/world/UI/InventorySlot";

export default class StashUI extends HTMLElement {
  Game: Game;
  slots: InventorySlot[];

  constructor(Game: Game) {
    super();
    this.Game = Game;

    this.classList.add("grid", "absolute");
    this.style.gridTemplateColumns = "repeat(3, 1fr)";
    this.style.backgroundColor = "#000000C8";
    this.style.top = "10px";
    this.style.left = "10px";
    this.style.zIndex = "10";
    this.style.visibility = "hidden";

    this.slots = [
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
      new InventorySlot(Game),
    ];

    this.slots.forEach((slot) => this.appendChild(slot));
  }

  toggleStashUI() {
    if (this.style.visibility === "hidden") {
      this.style.visibility = "visible";
    } else {
      this.style.visibility = "hidden";
    }
  }
}

customElements.define("stash-ui", StashUI);

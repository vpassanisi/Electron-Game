import Game from "renderer";
import InventorySlot from "renderer/lib/world/UI/InventorySlot";
import { Directions } from "renderer/types";
import Vector from "renderer/vector";
import type { Item } from "renderer/lib/world/Item";
import ItemInfo from "renderer/lib/world/UI/ItemInfo";
import Equipment from "renderer/lib/world/UI/Equipment";

export default class Inventory extends HTMLElement {
  Game: Game;
  inventoryDiv: HTMLDivElement;
  slots: {
    slot1: InventorySlot;
    slot2: InventorySlot;
    slot3: InventorySlot;
    slot4: InventorySlot;
    slot5: InventorySlot;
    slot6: InventorySlot;
  };
  selectionCoords: Vector;
  selectionMap: (InventorySlot | null)[][];
  selectedItemInfo: ItemInfo;
  Equipment: Equipment;
  grabbedSlot: InventorySlot | null;

  constructor(Game: Game) {
    super();
    this.Game = Game;
    this.grabbedSlot = null;
    this.selectedItemInfo = new ItemInfo(Game);
    this.selectedItemInfo.style.bottom = "";
    this.selectedItemInfo.style.top = "0px";
    this.selectedItemInfo.style.right = "188px";

    this.Equipment = new Equipment(Game);
    this.appendChild(this.Equipment);

    this.inventoryDiv = this.appendChild(document.createElement("div"));
    this.inventoryDiv.style.display = "grid";
    this.inventoryDiv.style.gridTemplateColumns = "repeat(3, 1fr)";

    this.selectionCoords = new Vector([0, 4]);
    this.slots = {
      slot1: new InventorySlot(Game),
      slot2: new InventorySlot(Game),
      slot3: new InventorySlot(Game),
      slot4: new InventorySlot(Game),
      slot5: new InventorySlot(Game),
      slot6: new InventorySlot(Game),
    };

    Object.entries(this.slots).forEach(([key, slot]) => {
      this.inventoryDiv.appendChild(slot);
    });

    this.style.position = "absolute";
    this.style.top = "10px";
    this.style.right = "10px";
    this.style.backgroundColor = "#000000C8";
    this.style.visibility = "hidden";

    this.appendChild(this.selectedItemInfo);

    this.selectionMap = [
      [null, this.Equipment.helmetSlot, null],
      [null, this.Equipment.chestSlot, null],
      [this.Equipment.glovesSlot, null, this.Equipment.bootsSlot],
      [this.slots.slot1, this.slots.slot2, this.slots.slot3],
      [this.slots.slot4, this.slots.slot5, this.slots.slot6],
    ];
  }

  get selectedSlot() {
    return this.selectionMap[this.selectionCoords.y][this.selectionCoords.x];
  }

  toggleInventory() {
    if (this.style.visibility === "hidden") {
      this.style.visibility = "visible";
      this.selectedItemInfo.setCurrentItem(this.selectedSlot?.item);
      this.Game.state.paused = true;
    } else {
      this.style.visibility = "hidden";
      this.selectedItemInfo.setCurrentItem(null);
      this.Game.state.paused = false;
    }
  }

  update() {
    const { justPressed } = this.Game.Controller;
    Object.entries(this.slots).forEach(([key, slot]) => slot.update());
    this.Equipment.helmetSlot.update();
    this.Equipment.chestSlot.update();
    this.Equipment.glovesSlot.update();
    this.Equipment.bootsSlot.update();

    if (justPressed.tab) this.toggleInventory();

    if (this.style.visibility === "visible") {
      this.selectedItemInfo.setCurrentItem(this.selectedSlot?.item);

      if (justPressed.up) this.moveSelection("up");
      if (justPressed.down) this.moveSelection("down");
      if (justPressed.left) this.moveSelection("left");
      if (justPressed.right) this.moveSelection("right");
      if (justPressed.e) {
        if (!this.grabbedSlot) this.grabSelection();
        else this.moveSelectedItem();
      }
    }
  }

  putItemInInventory(item: Item) {
    let k: keyof typeof this.slots;
    for (k in this.slots) {
      const slot = this.slots[k];
      if (!slot.item) {
        slot.setItem(item);
        break;
      }
    }
  }

  grabSelection() {
    if (this.style.visibility === "hidden") return;
    if (!this.selectedSlot?.item) return;
    this.grabbedSlot = this.selectedSlot;
  }

  moveSelectedItem() {
    if (
      this.selectedSlot &&
      this.grabbedSlot?.item &&
      this.selectedSlot?.item?.id !== this.grabbedSlot?.item.id
    ) {
      const grabbedItem = this.grabbedSlot.item;
      const selectedSlotItem = this.selectedSlot.item;
      if (this.selectedSlot.setItem(grabbedItem)) {
        this.grabbedSlot.clearItem();
      }
      if (selectedSlotItem) {
        this.grabbedSlot.setItem(selectedSlotItem);
      }
    }
    this.grabbedSlot = null;
  }

  moveSelection(direction: Directions) {
    if (this.style.visibility === "visible") {
      let slot: InventorySlot | null;
      const { x, y } = this.selectionCoords;
      switch (direction) {
        case "up":
          slot = this.selectionMap[y - 1]?.[x];
          if (!slot) {
            slot = this.selectionMap[y - 1]?.[x - 1];
            if (!slot) {
              slot = this.selectionMap[y - 1]?.[x + 1];
              if (slot) {
                this.selectionCoords.y -= 1;
                this.selectionCoords.x += 1;
              }
            } else {
              this.selectionCoords.y -= 1;
              this.selectionCoords.x -= 1;
            }
          } else this.selectionCoords.y -= 1;
          break;
        case "down":
          slot = this.selectionMap[y + 1]?.[x];
          if (!slot) {
            slot = this.selectionMap[y + 1]?.[x - 1];
            if (!slot) {
              slot = this.selectionMap[y + 1]?.[x + 1];
              if (slot) {
                this.selectionCoords.y += 1;
                this.selectionCoords.x += 1;
              }
            } else {
              this.selectionCoords.y += 1;
              this.selectionCoords.x -= 1;
            }
          } else this.selectionCoords.y += 1;
          break;
        case "left":
          slot = this.selectionMap[y]?.[x - 1];
          if (!slot) {
            slot = this.selectionMap[y]?.[x - 2];
            if (slot) this.selectionCoords.x -= 2;
          } else this.selectionCoords.x -= 1;
          break;
        case "right":
          slot = this.selectionMap[y]?.[x + 1];
          if (!slot) {
            slot = this.selectionMap[y]?.[x + 2];
            if (slot) this.selectionCoords.x += 2;
          } else this.selectionCoords.x += 1;
          break;
      }
      this.selectedItemInfo.setCurrentItem(this.selectedSlot?.item, true);
    }
  }
}

customElements.define("player-inventory", Inventory);

import Game from "renderer";
import type Equipment from "renderer/lib/world/Player/Equipment";
import { ItemSaveData } from "renderer/types";

export default class SaveGame {
  Game: Game;
  state: {
    playerInventory: (ItemSaveData | null)[];
    playerEquipment: Equipment["saveData"];
    stash: (ItemSaveData | null)[];
  };

  constructor(Game: Game) {
    this.Game = Game;

    this.state = {
      playerInventory: [],
      playerEquipment: {
        helmetSlot: null,
        chestSlot: null,
        glovesSlot: null,
        bootsSlot: null,
      },
      stash: [],
    };
  }

  saveGame() {
    this.state.playerInventory = this.Game.Player.inventory.saveData;
    this.state.playerEquipment = this.Game.Player.equipment.saveData;
    this.state.stash = this.Game.stashInventory.saveData;

    window.electron.store.set("saveData", JSON.stringify(this.state));
  }

  loadGame() {
    const json = window.electron.store.get("saveData") as string | undefined;
    if (json) {
      const { playerInventory, playerEquipment, stash } = JSON.parse(json);
      playerInventory && this.Game.Player.inventory.loadSaveData(playerInventory);
      playerEquipment && this.Game.Player.equipment.loadSaveData(playerEquipment);
      stash && this.Game.stashInventory.loadSaveData(stash);
    }
  }
}

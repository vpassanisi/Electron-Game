import type { Container } from "Pixi.js";
import type Game from "renderer";
import MiniMap from "renderer/lib/world/UI/MiniMap";
import HealthBar from "./HealthBar";
import ItemInfo from "renderer/lib/world/UI/ItemInfo";
import Inventory from "renderer/lib/world/UI/Inventory";
import StashUI from "renderer/lib/world/UI/StashUI";

export default class UI {
  Game: Game;
  container: Container;
  element: HTMLElement;
  MiniMap: MiniMap;
  HealthBar: HealthBar;
  ItemInfo: ItemInfo;
  Inventory: Inventory;
  StashUI: StashUI;

  constructor(Game: Game) {
    this.Game = Game;
    this.container = new Game.Pixi.Container();

    this.MiniMap = new MiniMap(Game);
    this.container.addChild(this.MiniMap.container);

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    document.body.appendChild(this.element);

    this.HealthBar = new HealthBar(this.Game);
    this.element.appendChild(this.HealthBar);

    this.ItemInfo = new ItemInfo(this.Game);
    this.element.appendChild(this.ItemInfo);

    this.Inventory = new Inventory(this.Game);
    this.element.appendChild(this.Inventory);

    this.StashUI = new StashUI(this.Game);
    this.element.appendChild(this.StashUI);

    this.Game.World.addChild(this.container);
  }

  update() {
    this.MiniMap.update();
    this.HealthBar.update();
    this.Inventory.update();
    this.ItemInfo.update();
  }
}

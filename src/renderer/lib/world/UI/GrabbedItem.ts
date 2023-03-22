import Game from "renderer";
import { Sprite } from "Pixi.js";
import { Item } from "renderer/lib/world/Item";

export default class GrabbedItem {
  Game: Game;
  icon: Sprite;
  private _item: Item | null;

  constructor(Game: Game) {
    this.Game = Game;
    this._item = null;

    this.icon = new Sprite();
    this.icon.height = this.Game.dimentions.tileWidth;
    this.icon.width = this.Game.dimentions.tileHeight;
    this.icon.zIndex = 100;

    this.Game.World.addChild(this.icon);
  }

  get item() {
    return this._item;
  }

  set item(item: Item | null) {
    this._item = item;

    if (item) {
      this.icon.texture = item.texture;
      this.icon.visible = true;
    } else {
      this.icon.visible = false;
    }
  }

  update() {
    const { x, y } = this.Game.Renderer.events.pointer.global;
    this.icon.x = x;
    this.icon.y = y;
  }
}

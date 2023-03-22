import { Container, Sprite, Texture } from "Pixi.js";
import { Item } from "renderer/lib/world/Item";
import Game from "renderer";

export default class MouseOverInfo {
  Game: Game;
  private _item: Item | null;
  container: Container;
  containerBG: Sprite;
  margin: number;
  padding: number;
  icon: Sprite;

  constructor(Game: Game) {
    this.Game = Game;
    this._item = null;
    this.margin = 10;
    this.padding = 10;

    this.container = new Container();
    this.container.visible = false;
    this.container.zIndex = 1000;

    this.containerBG = new Sprite(Texture.WHITE);
    this.containerBG.tint = 0x383838;
    this.containerBG.width = this.Game.dimentions.tileWidth * 3;
    this.container.addChild(this.containerBG);

    this.icon = new Sprite();
    this.icon.anchor.set(0.5, 0.5);
    this.icon.height = this.Game.dimentions.tileHeight;
    this.icon.width = this.Game.dimentions.tileWidth;
    this.icon.x = this.container.width / 2;
    this.icon.y = this.icon.height / 2 + 10;
    this.container.addChild(this.icon);

    this.containerBG.height = this.container.height;
    this.Game.World.addChild(this.container);
  }

  get item() {
    return this._item;
  }

  set item(item: Item | null) {
    this._item = item;

    if (!item) {
      this.container.visible = false;
    } else {
      this.icon.texture = item.texture;
      this.container.visible = true;
    }
  }

  update() {
    const { x, y } = this.Game.Renderer.events.pointer.global;
    this.container.x = x - this.container.width - this.margin;
    this.container.y = y;
  }
}

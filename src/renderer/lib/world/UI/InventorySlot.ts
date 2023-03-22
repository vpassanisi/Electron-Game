import { Sprite, Container, Texture } from "Pixi.js";
import { Button } from "@pixi/ui";
import Game from "renderer";
import { Item } from "renderer/lib/world/Item";

export default class InventorySlot {
  Game: Game;
  button: Button;
  sprite: Sprite;
  bgSprite: Sprite;
  container: Container;
  height: number;
  width: number;
  whitelisted: typeof Item | null;
  private _item: Item | null;

  constructor(Game: Game, whitelisted?: typeof Item) {
    this.Game = Game;
    this._item = null;
    this.whitelisted = whitelisted ?? null;
    this.height = this.Game.dimentions.tileHeight;
    this.width = this.Game.dimentions.tileWidth;

    this.sprite = new Sprite();
    this.sprite.height = this.Game.dimentions.tileHeight;
    this.sprite.width = this.Game.dimentions.tileWidth;

    this.bgSprite = new Sprite(Texture.WHITE);
    this.bgSprite.tint = 0x141414;
    this.bgSprite.height = this.Game.dimentions.tileHeight;
    this.bgSprite.width = this.Game.dimentions.tileWidth;

    this.button = new Button(this.bgSprite);

    this.container = new Container();
    this.container.addChild(this.bgSprite);
    this.container.addChild(this.sprite);

    this.button.onPress.connect(this.onPress);
    this.button.onHover.connect(this.onHover);
    this.button.onOut.connect(this.onOut);
  }

  get item() {
    return this._item;
  }

  set item(item: Item | null) {
    this._item = item;

    if (item) this.sprite.texture = item.texture;
    else this.sprite.texture = Texture.EMPTY;
  }

  onPress = () => {
    const { item } = this.Game.GrabbedItem;
    if (item && this.whitelisted && !(item instanceof this.whitelisted)) return;
    this.Game.GrabbedItem.item = this.item;
    this.item = item;
  };

  onHover = () => {
    if (this._item) this.Game.MouseOverInfo.item = this.item;
    this.bgSprite.tint = 0x1f1f1f;
  };

  onOut = () => {
    this.Game.MouseOverInfo.item = null;
    this.bgSprite.tint = 0x141414;
  };
}

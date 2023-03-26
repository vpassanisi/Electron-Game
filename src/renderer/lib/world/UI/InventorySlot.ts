import { Sprite, Container, Texture } from "Pixi.js";
import Game from "renderer";
import { Item } from "renderer/lib/world/Item";
import { ItemTypes } from "renderer/types";

interface args {
  Game: Game;
  whitelisted?: ItemTypes;
  updatePlayerStats?: boolean;
}

export default class InventorySlot {
  Game: Game;
  sprite: Sprite;
  bgSprite: Sprite;
  container: Container;
  height: number;
  width: number;
  whitelisted: ItemTypes | null;
  private _item: Item | null;
  updatePlayerStats: boolean;

  constructor({ Game, whitelisted, updatePlayerStats }: args) {
    this.Game = Game;
    this._item = null;
    this.whitelisted = whitelisted ?? null;
    this.height = this.Game.dimentions.tileHeight;
    this.width = this.Game.dimentions.tileWidth;
    this.updatePlayerStats = updatePlayerStats ?? false;

    this.sprite = new Sprite();
    this.sprite.height = this.Game.dimentions.tileHeight;
    this.sprite.width = this.Game.dimentions.tileWidth;

    this.bgSprite = new Sprite(Texture.WHITE);
    this.bgSprite.tint = 0x141414;
    this.bgSprite.height = this.Game.dimentions.tileHeight;
    this.bgSprite.width = this.Game.dimentions.tileWidth;

    this.container = new Container();
    this.container.addChild(this.bgSprite);
    this.container.addChild(this.sprite);

    this.container.on("click", this.onPress);
    this.container.on("mouseenter", this.onHover);
    this.container.on("mouseleave", this.onOut);
    this.container.eventMode = "static";
  }

  get item() {
    return this._item;
  }

  set item(item: Item | null) {
    this._item = item;

    if (item) this.sprite.texture = item.texture;
    else this.sprite.texture = Texture.EMPTY;

    if (this.updatePlayerStats) this.Game.Player.updateStats();
  }

  onPress = () => {
    const { item } = this.Game.GrabbedItem;
    if (item && this.whitelisted && item.itemType !== this.whitelisted) return;
    this.Game.GrabbedItem.item = this.item;
    this.item = item;
    this.Game.MouseOverInfo.item = item;

    this.Game.SaveGame.saveGame();
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

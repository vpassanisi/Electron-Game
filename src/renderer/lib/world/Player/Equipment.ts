import type Game from "renderer";
import { Boots, Chest, Gloves, Helmet, Item } from "renderer/lib/world/Item";
import InventorySlot from "renderer/lib/world/UI/InventorySlot";
import { List } from "@pixi/ui";
import { Container, Sprite, Texture } from "Pixi.js";

export default class Equipment {
  Game: Game;
  helmetSlot: InventorySlot;
  chestSlot: InventorySlot;
  glovesSlot: InventorySlot;
  bootsSlot: InventorySlot;
  list: List;
  container: Container;
  containerBG: Sprite;
  playerSprite: Sprite;

  constructor(Game: Game) {
    this.Game = Game;

    const elementsMargin = 1;
    const horPadding = 5;
    const vertPadding = 5;
    const columns = 3;
    const rows = 4;

    this.container = new Container();
    this.container.visible = false;

    this.containerBG = new Sprite(Texture.WHITE);
    this.containerBG.tint = 0x383838;
    this.containerBG.width =
      this.Game.dimentions.tileWidth * columns +
      elementsMargin * (columns - 1) +
      horPadding * 2 +
      1;
    this.containerBG.height =
      this.Game.dimentions.tileHeight * rows +
      elementsMargin +
      elementsMargin * (rows - 1) +
      vertPadding * 2;
    this.container.addChild(this.containerBG);

    this.helmetSlot = new InventorySlot(Game, Helmet);
    this.chestSlot = new InventorySlot(Game, Chest);
    this.glovesSlot = new InventorySlot(Game, Gloves);
    this.bootsSlot = new InventorySlot(Game, Boots);

    this.list = new List({
      elementsMargin,
      horPadding,
      vertPadding,
      type: "vertical",
    });

    this.container.addChild(this.list);

    this.list.addChild(this.helmetSlot.container);
    this.list.addChild(this.chestSlot.container);
    this.list.addChild(this.glovesSlot.container);
    this.list.addChild(this.bootsSlot.container);

    this.playerSprite = new Sprite(this.Game.Assets.playerStaticTexture);
    this.playerSprite.anchor.set(0.5, 0.5);
    this.playerSprite.height = this.Game.dimentions.tileHeight * 2;
    this.playerSprite.width = this.Game.dimentions.tileWidth * 2;
    this.playerSprite.x = this.container.width / 2 + this.Game.dimentions.tileWidth / 2;
    this.playerSprite.y = this.container.height / 2;
    this.container.addChild(this.playerSprite);

    this.container.x =
      this.Game.dimentions.canvasWidth - this.container.width - this.Game.dimentions.tileWidth / 2;
    this.container.y = this.Game.dimentions.tileHeight / 2;

    this.Game.World.addChild(this.container);
  }

  get equiped() {
    return {
      helmet: this.helmetSlot.item,
      chest: this.chestSlot.item,
      gloves: this.glovesSlot.item,
      boots: this.bootsSlot.item,
    };
  }

  get equipedList() {
    return Object.entries(this.equiped).reduce((prev, entry) => {
      if (entry[1]) return [...prev, entry[1]];
      else return prev;
    }, [] as Item[]);
  }

  toggleEquipment() {
    this.container.visible = !this.container.visible;
  }
}

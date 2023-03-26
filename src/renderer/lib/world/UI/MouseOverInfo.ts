import { Container, Sprite, Texture, Text, TextStyle, Graphics } from "Pixi.js";
import { Item } from "renderer/lib/world/Item";
import Game from "renderer";
import { MaskedFrame } from "@pixi/ui";

export default class MouseOverInfo {
  Game: Game;
  private _item: Item | null;
  container: Container;
  containerBG: Sprite;
  margin: number;
  padding: number;
  icon: Sprite;
  modText1: Text;
  modText2: Text;
  textStyle: TextStyle;
  frame: MaskedFrame;

  constructor(Game: Game) {
    this.Game = Game;
    this._item = null;
    this.margin = 10;
    this.padding = 10;

    this.container = new Container();

    this.containerBG = new Sprite(Texture.WHITE);
    this.containerBG.tint = 0x141414;
    this.containerBG.width = this.Game.dimentions.tileWidth * 4;
    this.container.addChild(this.containerBG);

    this.icon = new Sprite();
    this.icon.anchor.set(0.5, 0.5);
    this.icon.height = this.Game.dimentions.tileHeight;
    this.icon.width = this.Game.dimentions.tileWidth;
    this.icon.x = this.container.width / 2;
    this.icon.y = this.icon.height / 2 + 10;
    this.container.addChild(this.icon);

    this.textStyle = new TextStyle({
      align: "center",
      wordWrap: true,
      fill: 0xffffff,
      fontSize: "16px",
      wordWrapWidth: this.container.width - this.margin * 2,
    });

    this.modText1 = new Text("", this.textStyle);
    this.modText1.anchor.set(0.5, 0.5);
    this.modText1.y = this.icon.height + this.margin * 2;
    this.modText1.x = this.container.width / 2;
    this.container.addChild(this.modText1);

    this.modText2 = new Text("", this.textStyle);
    this.modText2.anchor.set(0.5, 0.5);
    this.modText2.y = this.icon.height + this.modText2.height + this.margin * 2;
    this.modText2.x = this.container.width / 2;
    this.container.addChild(this.modText2);

    this.containerBG.height = this.container.height + this.margin;

    this.frame = new MaskedFrame({
      target: this.container,
      mask: new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, this.container.width, this.container.height),
      borderColor: 0xe3e3e3,
      borderWidth: 1,
    });
    this.frame.visible = false;
    this.frame.zIndex = 1000;

    this.Game.World.addChild(this.frame);
  }

  get item() {
    return this._item;
  }

  set item(item: Item | null) {
    this._item = item;

    if (!item) {
      this.frame.visible = false;
    } else {
      this.icon.texture = item.texture;
      this.modText1.text = item.prefixMod1?.text ?? "";
      this.modText2.text = item.suffixMod1?.text ?? "";
      this.frame.visible = true;
    }
  }

  update() {
    let { x, y } = this.Game.Renderer.events.pointer.global;
    if (x <= this.frame.width + this.margin) x += this.frame.width + this.margin * 2;
    if (y + this.frame.height >= this.Game.dimentions.canvasHeight) {
      y = this.Game.dimentions.canvasHeight - this.frame.height;
    }
    this.frame.x = x - this.frame.width - this.margin;
    this.frame.y = y;
  }
}

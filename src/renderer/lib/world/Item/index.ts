import type { Sprite, Texture } from "pixi.js";
import Game from "renderer";
import Hitbox from "renderer/lib/PolygonHitbox";
import { getPrefixMod, PrefixMod } from "renderer/lib/world/Item/PrefixMods";
import { SuffixMod, getSuffixMod } from "renderer/lib/world/Item/SuffixMods";
import Vector from "renderer/vector";
import PolygonHitbox from "renderer/lib/PolygonHitbox";

export class Item {
  Game: Game;
  prefixMod1: PrefixMod;
  suffixMod1: SuffixMod;
  texture: Texture;
  sprite: Sprite;
  hitbox: Hitbox;
  constructor(Game: Game, position: Vector) {
    this.Game = Game;
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();

    this.texture = Game.Assets.bootsTexture;
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.hitbox = new Hitbox(Game, {
      verts: [new Vector(), new Vector(), new Vector()],
    });
  }
}

export class Helmet implements Item {
  Game: Game;
  prefixMod1: PrefixMod;
  suffixMod1: SuffixMod;
  texture: Texture;
  sprite: Sprite;
  hitbox: Hitbox;
  constructor(Game: Game, position: Vector) {
    this.Game = Game;
    this.prefixMod1 = getPrefixMod();
    this.suffixMod1 = getSuffixMod();

    this.texture = Game.Assets.helmetTexture;
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    this.sprite.width = (Game.canvas.offsetWidth / 15) * 0.7;
    this.sprite.height = (Game.canvas.offsetHeight / 9) * 0.7;

    this.hitbox = new PolygonHitbox(Game, {
      center: new Vector([this.sprite.x, this.sprite.y]),
      deltas: [
        new Vector([-this.sprite.width / 2, -this.sprite.height / 2]),
        new Vector([this.sprite.width / 2, -this.sprite.height / 2]),
        new Vector([this.sprite.width / 2, this.sprite.height / 2]),
        new Vector([-this.sprite.width / 2, this.sprite.height / 2]),
      ],
    });

    Game.Stage.addChild(this.sprite);
  }

  pickup() {
    this.Game.Stage.removeChild(this.sprite);
  }
}

import type * as PIXI from "Pixi.js";
import type Game from "../../index";

export default class Wall {
  x: number;
  y: number;
  texture: PIXI.Texture | undefined;
  sprite: PIXI.Sprite | undefined;

  constructor(Game: Game, type: string, tileIndex: Array<number>) {
    this.x = (Game.root.offsetWidth / 15) * tileIndex[0];
    this.y = (Game.root.offsetHeight / 9) * tileIndex[1];

    console.log(type);

    let spriteX = 0;
    let spriteY = 0;

    switch (true) {
      case type === "left":
        spriteX = 16 * 3;
        spriteY = 16 * 1;
        break;
      case type === "right":
        spriteX = 16 * 5;
        spriteY = 16 * 1;
        break;
      case type === "top":
        spriteX = 16 * 4;
        spriteY = 16 * 0;
        break;
      case type === "bottom":
        spriteX = 16 * 4;
        spriteY = 16 * 2;
        break;
      case type === "topLeft":
        spriteX = 16 * 3;
        spriteY = 16 * 0;
        break;
      case type === "topRight":
        spriteX = 16 * 5;
        spriteY = 16 * 0;
        break;
      case type === "bottomLeft":
        spriteX = 16 * 3;
        spriteY = 16 * 2;
        break;
      case type === "bottomRight":
        spriteX = 16 * 5;
        spriteY = 16 * 2;
        break;
      default:
        break;
    }

    this.texture = new Game.Pixi.Texture(
      Game.envBaseTexture,
      new Game.Pixi.Rectangle(spriteX, spriteY, 16, 16)
    );
    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.width = Game.root.offsetWidth / 15;
    this.sprite.height = Game.root.offsetHeight / 9;
    Game.pixiApp.stage.addChild(this.sprite);
  }

  update() {}

  render() {}
}

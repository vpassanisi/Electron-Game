import Game from "renderer/index";
import Vector from "renderer/vector";
import { BackgroundTypes } from "renderer/types";
import type { Texture, Sprite } from "pixi.js";

export default class Background {
  position: Vector;
  texture: Texture;
  sprite: Sprite;
  constructor(Game: Game, type: string, roomPos: Vector, roomCoords: Vector) {
    this.position = new Vector([
      (Game.canvas.offsetWidth * roomCoords.x) + (Game.canvas.offsetWidth / 15) * roomPos.x,
      (Game.canvas.offsetHeight * roomCoords.y) + (Game.canvas.offsetHeight / 9) * roomPos.y,
    ]);

    switch (true) {
      case type === BackgroundTypes.wood:
        this.texture = Game.Assets.woodFloorTexture;
        break;
      case type === BackgroundTypes.carpetTopLeft:
        this.texture = Game.Assets.carpetTopLeftTexture;
        break;
      case type === BackgroundTypes.carpetTop:
        this.texture = Game.Assets.carpetTopTexture;
        break;
      case type === BackgroundTypes.carpetTopRight:
        this.texture = Game.Assets.carpetTopRightTexture;
        break;
      case type === BackgroundTypes.carpetLeft:
        this.texture = Game.Assets.carpetLeftTexture;
        break;
      case type === BackgroundTypes.carpetCenter:
        this.texture = Game.Assets.carpetCenterTexture;
        break;
      case type === BackgroundTypes.carpetRight:
        this.texture = Game.Assets.carpetRightTexture;
        break;
      case type === BackgroundTypes.carpetBottomLeft:
        this.texture = Game.Assets.carpetBottomLeftTexture;
        break;
      case type === BackgroundTypes.carpetBottom:
        this.texture = Game.Assets.carpetBottomTexture;
        break;
      case type === BackgroundTypes.carpetBottomRight:
        this.texture = Game.Assets.carpetBottomRightTexture;
        break;
      default:
        this.texture = Game.Assets.woodFloorTexture;
    }

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.canvas.offsetWidth / 15;
    this.sprite.height = Game.canvas.offsetHeight / 9;
    this.sprite.zIndex = Game.zIndex.background;
    Game.Stage.addChild(this.sprite);
  }

  get leftSide() {
    return this.sprite.x;
  }
  get rightSide() {
    return this.sprite.x + this.sprite.width;
  }
  get topSide() {
    return this.sprite.y;
  }
  get bottomSide() {
    return this.sprite.y + this.sprite.height;
  }
}

import type Game from "renderer/index";
import Vector from "renderer/vector";
import { BackgroundTypes } from "renderer/types";
import type { Texture, Sprite } from "Pixi.js";
import Room from "renderer/lib/world/Room";

export default class Background {
  position: Vector;
  texture: Texture;
  sprite: Sprite;
  room: Room;

  constructor(Game: Game, room: Room, type: string, tileCoords: Vector) {
    this.room = room;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x,
      Game.dimentions.tileHeight * tileCoords.y,
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
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.background;
    this.room.container.addChild(this.sprite);
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

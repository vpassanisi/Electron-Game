import type Game from "renderer/index";
import Vector from "renderer/vector";
import { BackgroundTypes } from "renderer/types";
import type { Texture, Sprite } from "Pixi.js";
import Room from "renderer/lib/world/Room";
import Tile from "renderer/lib/world/Tile";

export default class Background {
  Game: Game;
  position: Vector;
  texture: Texture;
  sprite: Sprite;
  room: Room;
  tile: Tile;

  constructor(Game: Game, room: Room, type: string, tileCoords: Vector) {
    this.Game = Game;
    this.room = room;
    this.position = new Vector([
      Game.dimentions.tileWidth * tileCoords.x,
      Game.dimentions.tileHeight * tileCoords.y,
    ]);

    this.tile = this.room.map[tileCoords.y][tileCoords.x];

    switch (true) {
      case type === BackgroundTypes.wood:
        this.texture = Game.Assets.textures.woodFloorTexture;
        break;
      case type === BackgroundTypes.carpetTopLeft:
        this.texture = Game.Assets.textures.carpetTopLeftTexture;
        break;
      case type === BackgroundTypes.carpetTop:
        this.texture = Game.Assets.textures.carpetTopTexture;
        break;
      case type === BackgroundTypes.carpetTopRight:
        this.texture = Game.Assets.textures.carpetTopRightTexture;
        break;
      case type === BackgroundTypes.carpetLeft:
        this.texture = Game.Assets.textures.carpetLeftTexture;
        break;
      case type === BackgroundTypes.carpetCenter:
        this.texture = Game.Assets.textures.carpetCenterTexture;
        break;
      case type === BackgroundTypes.carpetRight:
        this.texture = Game.Assets.textures.carpetRightTexture;
        break;
      case type === BackgroundTypes.carpetBottomLeft:
        this.texture = Game.Assets.textures.carpetBottomLeftTexture;
        break;
      case type === BackgroundTypes.carpetBottom:
        this.texture = Game.Assets.textures.carpetBottomTexture;
        break;
      case type === BackgroundTypes.carpetBottomRight:
        this.texture = Game.Assets.textures.carpetBottomRightTexture;
        break;
      default:
        this.texture = Game.Assets.textures.woodFloorTexture;
    }

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.dimentions.tileWidth;
    this.sprite.height = Game.dimentions.tileHeight;
    this.sprite.zIndex = Game.zIndex.background;
    this.room.container.addChild(this.sprite);

    this.sprite.eventMode = "static";
    this.sprite.on("click", this.onClick);
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

  onClick = () => {
    const item = this.Game.GrabbedItem.item;
    if (item && !this.tile.model) {
      const { x, y } = this.Game.Renderer.events.pointer.global;
      item.drop(this.room, new Vector([x, y]));
      this.Game.GrabbedItem.item = null;
    }
  };
}

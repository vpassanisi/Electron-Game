import Game from "..";
import type * as Pixi from "pixi.js";

export default class Assets {
  envBaseTexture: Pixi.BaseTexture;
  playerBaseTexture: Pixi.BaseTexture;
  batBaseTexture: Pixi.BaseTexture;
  leftWallTexture: Pixi.Texture;
  rightWallTexture: Pixi.Texture;
  topWallTexture: Pixi.Texture;
  bottomWallTexture: Pixi.Texture;
  topLeftWallTexture: Pixi.Texture;
  topRightWallTexture: Pixi.Texture;
  bottomLeftWallTexture: Pixi.Texture;
  bottomRightWallTexture: Pixi.Texture;
  leftDoorTexture: Pixi.Texture;
  rightDoorTexture: Pixi.Texture;
  topDoorTexture: Pixi.Texture;
  bottomDoorTexture: Pixi.Texture;
  woodFloorTexture: Pixi.Texture;
  carpetTopLeftTexture: Pixi.Texture;
  carpetTopTexture: Pixi.Texture;
  carpetTopRightTexture: Pixi.Texture;
  carpetLeftTexture: Pixi.Texture;
  carpetCenterTexture: Pixi.Texture;
  carpetRightTexture: Pixi.Texture;
  carpetBottomLeftTexture: Pixi.Texture;
  carpetBottomTexture: Pixi.Texture;
  carpetBottomRightTexture: Pixi.Texture;
  rockTexture: Pixi.Texture;
  batTexture: Pixi.Texture;

  constructor(Game: Game) {
    this.envBaseTexture = Game.Pixi.BaseTexture.from("/environment/Final_Tileset.png");
    this.playerBaseTexture = Game.Pixi.BaseTexture.from("/player/knight_idle_spritesheet.png");
    this.batBaseTexture = Game.Pixi.BaseTexture.from("/enemy/fly_anim_spritesheet.png");
    this.leftWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 3, 16 * 1, 16, 16)
    );
    this.rightWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 5, 16 * 1, 16, 16)
    );
    this.topWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 4, 16 * 0, 16, 16)
    );
    this.bottomWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 4, 16 * 2, 16, 16)
    );
    this.topLeftWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 3, 16 * 0, 16, 16)
    );
    this.topRightWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 5, 16 * 0, 16, 16)
    );
    this.bottomLeftWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 3, 16 * 2, 16, 16)
    );
    this.bottomRightWallTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 5, 16 * 2, 16, 16)
    );
    this.leftDoorTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 13, 16 * 1, 16, 16)
    );
    this.rightDoorTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 12, 16 * 0, 16, 16)
    );
    this.topDoorTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 12, 16 * 1, 16, 16)
    );
    this.bottomDoorTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 13, 16 * 0, 16, 16)
    );
    this.woodFloorTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 1, 16 * 27, 16, 16)
    );
    this.carpetTopLeftTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 11, 16 * 17, 16, 16)
    );
    this.carpetTopTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 12, 16 * 17, 16, 16)
    );
    this.carpetTopRightTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 13, 16 * 17, 16, 16)
    );
    this.carpetLeftTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 11, 16 * 18, 16, 16)
    );
    this.carpetCenterTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 12, 16 * 18, 16, 16)
    );
    this.carpetRightTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 13, 16 * 18, 16, 16)
    );
    this.carpetBottomLeftTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 11, 16 * 19, 16, 16)
    );
    this.carpetBottomTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 12, 16 * 19, 16, 16)
    );
    this.carpetBottomRightTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 13, 16 * 19, 16, 16)
    );
    this.rockTexture = new Game.Pixi.Texture(
      this.envBaseTexture,
      new Game.Pixi.Rectangle(16 * 21, 16 * 12, 16, 16)
    );
    this.batTexture = new Game.Pixi.Texture(
      this.batBaseTexture,
      new Game.Pixi.Rectangle(16 * 0, 16 * 0, 16, 16)
    );
  }
}

import Game from "..";
import type * as Pixi from "pixi.js";

export default class Assets {
  envBaseTexture: Pixi.BaseTexture;
  playerBaseTexture: Pixi.BaseTexture;
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

  constructor(Game: Game) {
    this.envBaseTexture = Game.Pixi.BaseTexture.from("/environment/Final_Tileset.png");
    this.playerBaseTexture = Game.Pixi.BaseTexture.from("/player/knight_idle_spritesheet.png");
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
  }
}

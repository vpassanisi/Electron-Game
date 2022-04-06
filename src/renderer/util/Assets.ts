import Game from "renderer/index";
import type { Texture, BaseTexture } from "pixi.js";

export default class Assets {
  envBaseTexture: BaseTexture;
  batBaseTexture: BaseTexture;
  leftWallTexture: Texture;
  rightWallTexture: Texture;
  topWallTexture: Texture;
  bottomWallTexture: Texture;
  topLeftWallTexture: Texture;
  topRightWallTexture: Texture;
  bottomLeftWallTexture: Texture;
  bottomRightWallTexture: Texture;
  leftDoorTexture: Texture;
  rightDoorTexture: Texture;
  topDoorTexture: Texture;
  bottomDoorTexture: Texture;
  woodFloorTexture: Texture;
  carpetTopLeftTexture: Texture;
  carpetTopTexture: Texture;
  carpetTopRightTexture: Texture;
  carpetLeftTexture: Texture;
  carpetCenterTexture: Texture;
  carpetRightTexture: Texture;
  carpetBottomLeftTexture: Texture;
  carpetBottomTexture: Texture;
  carpetBottomRightTexture: Texture;
  rockTexture: Texture;
  batTexture: Texture;
  batTextures: Texture[];
  playerUpTexture: BaseTexture;
  playerUpTextures: Texture[];
  playerDownTexture: BaseTexture;
  playerDownTextures: Texture[];
  playerLeftTexture: BaseTexture;
  playerLeftTextures: Texture[];
  playerRightTexture: BaseTexture;
  playerRightTextures: Texture[];

  constructor(Game: Game) {
    this.envBaseTexture = Game.Pixi.BaseTexture.from(
      "/environment/Final_Tileset.png"
    );
    this.playerDownTexture = Game.Pixi.BaseTexture.from(
      "/player/char_run_down_anim_strip_6.png"
    );
    this.playerUpTexture = Game.Pixi.BaseTexture.from(
      "/player/char_run_up_anim_strip_6.png"
    );
    this.playerLeftTexture = Game.Pixi.BaseTexture.from(
      "/player/char_run_left_anim_strip_6.png"
    );
    this.playerRightTexture = Game.Pixi.BaseTexture.from(
      "/player/char_run_right_anim_strip_6.png"
    );
    this.batBaseTexture = Game.Pixi.BaseTexture.from(
      "/enemy/fly_anim_spritesheet.png"
    );
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
    this.batTextures = [
      new Game.Pixi.Texture(
        this.batBaseTexture,
        new Game.Pixi.Rectangle(16 * 0, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.batBaseTexture,
        new Game.Pixi.Rectangle(16 * 1, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.batBaseTexture,
        new Game.Pixi.Rectangle(16 * 2, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.batBaseTexture,
        new Game.Pixi.Rectangle(16 * 3, 16 * 0, 16, 16)
      ),
    ];
    this.playerDownTextures = [
      new Game.Pixi.Texture(
        this.playerDownTexture,
        new Game.Pixi.Rectangle(16 * 0, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerDownTexture,
        new Game.Pixi.Rectangle(16 * 1, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerDownTexture,
        new Game.Pixi.Rectangle(16 * 2, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerDownTexture,
        new Game.Pixi.Rectangle(16 * 3, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerDownTexture,
        new Game.Pixi.Rectangle(16 * 4, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerDownTexture,
        new Game.Pixi.Rectangle(16 * 5, 16 * 0, 16, 16)
      ),
    ];
    this.playerUpTextures = [
      new Game.Pixi.Texture(
        this.playerUpTexture,
        new Game.Pixi.Rectangle(16 * 0, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerUpTexture,
        new Game.Pixi.Rectangle(16 * 1, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerUpTexture,
        new Game.Pixi.Rectangle(16 * 2, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerUpTexture,
        new Game.Pixi.Rectangle(16 * 3, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerUpTexture,
        new Game.Pixi.Rectangle(16 * 4, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerUpTexture,
        new Game.Pixi.Rectangle(16 * 5, 16 * 0, 16, 16)
      ),
    ];
    this.playerLeftTextures = [
      new Game.Pixi.Texture(
        this.playerLeftTexture,
        new Game.Pixi.Rectangle(16 * 0, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerLeftTexture,
        new Game.Pixi.Rectangle(16 * 1, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerLeftTexture,
        new Game.Pixi.Rectangle(16 * 2, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerLeftTexture,
        new Game.Pixi.Rectangle(16 * 3, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerLeftTexture,
        new Game.Pixi.Rectangle(16 * 4, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerLeftTexture,
        new Game.Pixi.Rectangle(16 * 5, 16 * 0, 16, 16)
      ),
    ];
    this.playerRightTextures = [
      new Game.Pixi.Texture(
        this.playerRightTexture,
        new Game.Pixi.Rectangle(16 * 0, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerRightTexture,
        new Game.Pixi.Rectangle(16 * 1, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerRightTexture,
        new Game.Pixi.Rectangle(16 * 2, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerRightTexture,
        new Game.Pixi.Rectangle(16 * 3, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerRightTexture,
        new Game.Pixi.Rectangle(16 * 4, 16 * 0, 16, 16)
      ),
      new Game.Pixi.Texture(
        this.playerRightTexture,
        new Game.Pixi.Rectangle(16 * 5, 16 * 0, 16, 16)
      ),
    ];
  }
}

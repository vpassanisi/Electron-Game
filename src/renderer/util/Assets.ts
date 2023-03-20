import type Game from "renderer/index";
import type { Texture, BaseTexture } from "Pixi.js";

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
  leftOpenDoorTexture: Texture;
  rightDoorTexture: Texture;
  rightOpenDoorTexture: Texture;
  topDoorTexture: Texture;
  topOpenDoorTexture: Texture;
  bottomDoorTexture: Texture;
  bottomOpenDoorTexture: Texture;
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
  itemsBaseTextures: BaseTexture;
  helmetTexture: Texture;
  glovesTexture: Texture;
  chestTexture: Texture;
  bootsTexture: Texture;
  portalTexture: Texture;
  switchLeftTexture: Texture;
  switchRightTexture: Texture;

  constructor(Game: Game) {
    const { BaseTexture, Texture, Rectangle } = Game.Pixi;

    this.envBaseTexture = BaseTexture.from("../static/environment/Final_Tileset.png");
    this.playerDownTexture = BaseTexture.from("../static/player/char_run_down_anim_strip_6.png");
    this.playerUpTexture = BaseTexture.from("../static/player/char_run_up_anim_strip_6.png");
    this.playerLeftTexture = BaseTexture.from("../static/player/char_run_left_anim_strip_6.png");
    this.playerRightTexture = BaseTexture.from("../static/player/char_run_right_anim_strip_6.png");
    this.batBaseTexture = BaseTexture.from("../static/enemy/fly_anim_spritesheet.png");
    this.itemsBaseTextures = BaseTexture.from("../static/items/16x16_RPG_Items.png");
    this.helmetTexture = new Texture(BaseTexture.from("../static/items/helmet.png"));
    this.glovesTexture = new Texture(BaseTexture.from("../static/items/gloves.png"));
    this.chestTexture = new Texture(BaseTexture.from("../static/items/chest.png"));
    this.bootsTexture = new Texture(BaseTexture.from("../static/items/boots.png"));
    this.leftWallTexture = new Texture(this.envBaseTexture, new Rectangle(16 * 3, 16 * 1, 16, 16));
    this.rightWallTexture = new Texture(this.envBaseTexture, new Rectangle(16 * 5, 16 * 1, 16, 16));
    this.topWallTexture = new Texture(this.envBaseTexture, new Rectangle(16 * 4, 16 * 0, 16, 16));
    this.bottomWallTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 4, 16 * 2, 16, 16)
    );
    this.topLeftWallTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 3, 16 * 0, 16, 16)
    );
    this.topRightWallTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 5, 16 * 0, 16, 16)
    );
    this.bottomLeftWallTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 3, 16 * 2, 16, 16)
    );
    this.bottomRightWallTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 5, 16 * 2, 16, 16)
    );
    this.leftDoorTexture = new Texture(this.envBaseTexture, new Rectangle(16 * 13, 16 * 1, 16, 16));
    this.leftOpenDoorTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 15, 16 * 1, 16, 16)
    );
    this.rightDoorTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 12, 16 * 0, 16, 16)
    );
    this.rightOpenDoorTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 15, 16 * 0, 16, 16)
    );
    this.topDoorTexture = new Texture(this.envBaseTexture, new Rectangle(16 * 12, 16 * 1, 16, 16));
    this.topOpenDoorTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 14, 16 * 1, 16, 16)
    );
    this.bottomDoorTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 13, 16 * 0, 16, 16)
    );
    this.bottomOpenDoorTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 14, 16 * 0, 16, 16)
    );
    this.woodFloorTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 1, 16 * 27, 16, 16)
    );
    this.carpetTopLeftTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 11, 16 * 17, 16, 16)
    );
    this.carpetTopTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 12, 16 * 17, 16, 16)
    );
    this.carpetTopRightTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 13, 16 * 17, 16, 16)
    );
    this.carpetLeftTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 11, 16 * 18, 16, 16)
    );
    this.carpetCenterTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 12, 16 * 18, 16, 16)
    );
    this.carpetRightTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 13, 16 * 18, 16, 16)
    );
    this.carpetBottomLeftTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 11, 16 * 19, 16, 16)
    );
    this.carpetBottomTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 12, 16 * 19, 16, 16)
    );
    this.carpetBottomRightTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 13, 16 * 19, 16, 16)
    );
    this.rockTexture = new Texture(this.envBaseTexture, new Rectangle(16 * 21, 16 * 12, 16, 16));
    this.batTexture = new Texture(this.batBaseTexture, new Rectangle(16 * 0, 16 * 0, 16, 16));
    this.batTextures = [
      new Texture(this.batBaseTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
      new Texture(this.batBaseTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
      new Texture(this.batBaseTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
      new Texture(this.batBaseTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
    ];
    this.playerDownTextures = [
      new Texture(this.playerDownTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
      new Texture(this.playerDownTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
      new Texture(this.playerDownTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
      new Texture(this.playerDownTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
      new Texture(this.playerDownTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
      new Texture(this.playerDownTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
    ];
    this.playerUpTextures = [
      new Texture(this.playerUpTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
      new Texture(this.playerUpTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
      new Texture(this.playerUpTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
      new Texture(this.playerUpTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
      new Texture(this.playerUpTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
      new Texture(this.playerUpTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
    ];
    this.playerLeftTextures = [
      new Texture(this.playerLeftTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
      new Texture(this.playerLeftTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
      new Texture(this.playerLeftTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
      new Texture(this.playerLeftTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
      new Texture(this.playerLeftTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
      new Texture(this.playerLeftTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
    ];
    this.playerRightTextures = [
      new Texture(this.playerRightTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
      new Texture(this.playerRightTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
      new Texture(this.playerRightTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
      new Texture(this.playerRightTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
      new Texture(this.playerRightTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
      new Texture(this.playerRightTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
    ];
    this.portalTexture = new Texture(this.envBaseTexture, new Rectangle(16 * 24, 16 * 7, 16, 16));
    this.switchLeftTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 23, 16 * 14, 16, 16)
    );
    this.switchRightTexture = new Texture(
      this.envBaseTexture,
      new Rectangle(16 * 24, 16 * 14, 16, 16)
    );
  }
}

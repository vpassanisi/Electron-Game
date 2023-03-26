import type Game from "renderer/index";
import { Texture, BaseTexture, SCALE_MODES } from "Pixi.js";

export default class Assets {
  baseTextures: {
    envBaseTexture: BaseTexture;
    batBaseTexture: BaseTexture;
    playerUpTexture: BaseTexture;
    playerDownTexture: BaseTexture;
    playerLeftTexture: BaseTexture;
    playerRightTexture: BaseTexture;
    itemsBaseTextures: BaseTexture;
  };

  textures: {
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
    portalTexture: Texture;
    switchLeftTexture: Texture;
    switchRightTexture: Texture;
    playerStaticTexture: Texture;
    stashTexture: Texture;
  };

  animatedTextures: {
    batTextures: Texture[];
    playerUpTextures: Texture[];
    playerDownTextures: Texture[];
    playerLeftTextures: Texture[];
    playerRightTextures: Texture[];
  };

  itemTextures: {
    helmet: Texture;
    chest: Texture;
    gloves: Texture;
    boots: Texture;
  };

  constructor(Game: Game) {
    const { BaseTexture, Texture, Rectangle } = Game.Pixi;

    this.baseTextures = {
      envBaseTexture: BaseTexture.from("../static/environment/Final_Tileset.png", {
        scaleMode: SCALE_MODES.NEAREST,
      }),
      playerDownTexture: BaseTexture.from("../static/player/char_run_down_anim_strip_6.png", {
        scaleMode: SCALE_MODES.NEAREST,
      }),
      playerUpTexture: BaseTexture.from("../static/player/char_run_up_anim_strip_6.png", {
        scaleMode: SCALE_MODES.NEAREST,
      }),
      playerLeftTexture: BaseTexture.from("../static/player/char_run_left_anim_strip_6.png", {
        scaleMode: SCALE_MODES.NEAREST,
      }),
      playerRightTexture: BaseTexture.from("../static/player/char_run_right_anim_strip_6.png", {
        scaleMode: SCALE_MODES.NEAREST,
      }),
      batBaseTexture: BaseTexture.from("../static/enemy/fly_anim_spritesheet.png", {
        scaleMode: SCALE_MODES.NEAREST,
      }),
      itemsBaseTextures: BaseTexture.from("../static/items/16x16_RPG_Items.png", {
        scaleMode: SCALE_MODES.NEAREST,
      }),
    };

    this.textures = {
      playerStaticTexture: new Texture(
        this.baseTextures.playerDownTexture,
        new Rectangle(16, 0, 16, 16)
      ),
      leftWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 3, 16 * 1, 16, 16)
      ),
      rightWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 5, 16 * 1, 16, 16)
      ),
      topWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 4, 16 * 0, 16, 16)
      ),
      bottomWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 4, 16 * 2, 16, 16)
      ),
      topLeftWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 3, 16 * 0, 16, 16)
      ),
      topRightWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 5, 16 * 0, 16, 16)
      ),
      bottomLeftWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 3, 16 * 2, 16, 16)
      ),
      bottomRightWallTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 5, 16 * 2, 16, 16)
      ),
      leftDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 13, 16 * 1, 16, 16)
      ),
      leftOpenDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 15, 16 * 1, 16, 16)
      ),
      rightDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 12, 16 * 0, 16, 16)
      ),
      rightOpenDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 15, 16 * 0, 16, 16)
      ),
      topDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 12, 16 * 1, 16, 16)
      ),
      topOpenDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 14, 16 * 1, 16, 16)
      ),
      bottomDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 13, 16 * 0, 16, 16)
      ),
      bottomOpenDoorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 14, 16 * 0, 16, 16)
      ),
      woodFloorTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 1, 16 * 27, 16, 16)
      ),
      carpetTopLeftTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 11, 16 * 17, 16, 16)
      ),
      carpetTopTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 12, 16 * 17, 16, 16)
      ),
      carpetTopRightTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 13, 16 * 17, 16, 16)
      ),
      carpetLeftTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 11, 16 * 18, 16, 16)
      ),
      carpetCenterTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 12, 16 * 18, 16, 16)
      ),
      carpetRightTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 13, 16 * 18, 16, 16)
      ),
      carpetBottomLeftTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 11, 16 * 19, 16, 16)
      ),
      carpetBottomTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 12, 16 * 19, 16, 16)
      ),
      carpetBottomRightTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 13, 16 * 19, 16, 16)
      ),
      rockTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 21, 16 * 12, 16, 16)
      ),
      batTexture: new Texture(
        this.baseTextures.batBaseTexture,
        new Rectangle(16 * 0, 16 * 0, 16, 16)
      ),
      portalTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 24, 16 * 7, 16, 16)
      ),
      switchLeftTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 23, 16 * 14, 16, 16)
      ),
      switchRightTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 24, 16 * 14, 16, 16)
      ),
      stashTexture: new Texture(
        this.baseTextures.envBaseTexture,
        new Rectangle(16 * 5, 16 * 16, 16, 16)
      ),
    };

    this.itemTextures = {
      helmet: new Texture(
        BaseTexture.from("../static/items/helmet.png", {
          scaleMode: SCALE_MODES.NEAREST,
        })
      ),
      chest: new Texture(
        BaseTexture.from("../static/items/chest.png", {
          scaleMode: SCALE_MODES.NEAREST,
        })
      ),
      gloves: new Texture(
        BaseTexture.from("../static/items/gloves.png", {
          scaleMode: SCALE_MODES.NEAREST,
        })
      ),
      boots: new Texture(
        BaseTexture.from("../static/items/boots.png", {
          scaleMode: SCALE_MODES.NEAREST,
        })
      ),
    };

    this.animatedTextures = {
      batTextures: [
        new Texture(this.baseTextures.batBaseTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.batBaseTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.batBaseTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.batBaseTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
      ],
      playerDownTextures: [
        new Texture(this.baseTextures.playerDownTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerDownTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerDownTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerDownTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerDownTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerDownTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
      ],
      playerUpTextures: [
        new Texture(this.baseTextures.playerUpTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerUpTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerUpTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerUpTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerUpTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerUpTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
      ],
      playerLeftTextures: [
        new Texture(this.baseTextures.playerLeftTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerLeftTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerLeftTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerLeftTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerLeftTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerLeftTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
      ],
      playerRightTextures: [
        new Texture(this.baseTextures.playerRightTexture, new Rectangle(16 * 0, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerRightTexture, new Rectangle(16 * 1, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerRightTexture, new Rectangle(16 * 2, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerRightTexture, new Rectangle(16 * 3, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerRightTexture, new Rectangle(16 * 4, 16 * 0, 16, 16)),
        new Texture(this.baseTextures.playerRightTexture, new Rectangle(16 * 5, 16 * 0, 16, 16)),
      ],
    };
  }
}

import anime from "animejs";
import type { Texture, Sprite } from "Pixi.js";
import Game from "renderer/index";
import Vector from "renderer/vector";
import Model from "renderer/lib/world/Model/Model";
import Room from "renderer/lib/world/Room";
import { getAdjacentCoords } from "renderer/util/generalUtil";

export default class Door implements Model {
  position: Vector;
  texture: Texture;
  sprite: Sprite;
  willLoad: Room | null;
  Game: Game;
  type: string;
  roomCoords: Vector;
  playerDestinationTile: Vector;
  getAnimeParams: () => {
    coord: string;
    target: number;
  };
  constructor(Game: Game, tileCoords: Vector, roomCoords: Vector) {
    this.Game = Game;
    this.willLoad = null;
    this.roomCoords = roomCoords;
    this.position = new Vector([
      Game.canvas.offsetWidth * roomCoords.x +
        (Game.canvas.offsetWidth / 15) * tileCoords.x,
      Game.canvas.offsetHeight * roomCoords.y +
        (Game.canvas.offsetHeight / 9) * tileCoords.y,
    ]);

    const { x, y } = tileCoords;
    switch (true) {
      case x === 0:
        this.type = "left";
        this.texture = Game.Assets.leftDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x - this.Game.canvas.offsetWidth,
        });
        this.playerDestinationTile = new Vector([13, 4]);
        break;
      case x === 14:
        this.type = "right";
        this.texture = Game.Assets.rightDoorTexture;
        this.getAnimeParams = () => ({
          coord: "x",
          target: this.Game.Stage.pivot.x + this.Game.canvas.offsetWidth,
        });
        this.playerDestinationTile = new Vector([1, 4]);
        break;
      case y === 0:
        this.type = "top";
        this.texture = Game.Assets.topDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y - this.Game.canvas.offsetHeight,
        });
        this.playerDestinationTile = new Vector([7, 7]);
        break;
      case y === 8:
        this.type = "bottom";
        this.texture = Game.Assets.bottomDoorTexture;
        this.getAnimeParams = () => ({
          coord: "y",
          target: this.Game.Stage.pivot.y + this.Game.canvas.offsetHeight,
        });
        this.playerDestinationTile = new Vector([7, 1]);
        break;
      default:
        this.type = "top";
        this.texture = Game.Assets.bottomDoorTexture;
        this.getAnimeParams = () => ({ coord: "y", target: 0 });
        this.playerDestinationTile = new Vector();
    }

    this.sprite = new Game.Pixi.Sprite(this.texture);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.width = Game.canvas.offsetWidth / 15;
    this.sprite.height = Game.canvas.offsetHeight / 9;
    Game.Stage.addChild(this.sprite);

    // const hitBox = new Game.Pixi.Graphics();
    // hitBox.beginFill(0xff00b8);
    // hitBox.drawRect(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
    // Game.pixiApp.stage.addChild(hitBox);
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

  async playerCollision() {
    const { x, y } = getAdjacentCoords(this.roomCoords, this.type);
    this.willLoad = this.Game.floorGrid[y]?.[x]?.room ?? null;
    this.willLoad && (await this.moveStage(this.willLoad));
  }

  private async moveStage(nextRoom: Room) {
    this.Game.state.paused = true;
    const params = this.getAnimeParams();
    await anime({
      targets: [this.Game.Stage.pivot],
      [params.coord]: params.target,
      round: 1,
      duration: 300,
      easing: "easeInQuad",
    }).finished;
    this.Game.currentRoom = nextRoom;
    this.Game.Player.direction.x = 0;
    this.Game.Player.direction.y = 0;
    this.Game.Player.hitBox.x =
      this.Game.currentRoom.map[this.playerDestinationTile.y][
        this.playerDestinationTile.x
      ].background?.position.x ?? 0;
    this.Game.Player.hitBox.y =
      this.Game.currentRoom.map[this.playerDestinationTile.y][
        this.playerDestinationTile.x
      ].background?.position.y ?? 0;
    this.Game.Player.move();
    setTimeout(() => (this.Game.state.paused = false), 200);
    this.Game.clearPlayerEntities();
  }

  remove() {}
  update() {}
  render() {}
}
